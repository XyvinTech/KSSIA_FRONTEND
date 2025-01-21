import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack, FormHelperText } from "@mui/material";
import { StyledEventUpload } from "../ui/StyledEventUpload.jsx";
import { StyledButton } from "../ui/StyledButton.jsx";
import { StyledTime } from "../ui/StyledTime.jsx";
import { StyledCalender } from "../ui/StyledCalender.jsx";
import StyledInput from "../ui/StyledInput.jsx";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField.jsx";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import {
  createEvent,
  getEventById,
  updateEventById,
} from "/src/api/events-api.js";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField .jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadFileToS3 from "../utils/s3Upload.js";
import moment from "moment";

export default function AddEvent({ eventId, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };
  const handleClear = (event) => {
    event.preventDefault();
    setSelectedTab(0);
    reset();
    navigate(-1);
  };
  const [speakers, setSpeakers] = useState([
    {
      speaker_name: "",
      speaker_designation: "",
      speaker_role: "",
      speaker_image: "",
    },
  ]);
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const option = [
    { value: "gmeet", label: "Gmeet" },
    { value: "zoom", label: "Zoom" },
    { value: "microsoft", label: "Microsoft Teams" },
    { value: "webex", label: "Webex" },
    { value: "zoho", label: "Zoho" },
  ];

  const types = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.image || "";

      if (imageFile) {
        try {
          imageUrl = await new Promise((resolve, reject) => {
            uploadFileToS3(
              imageFile,
              (location) => resolve(location),
              (error) => reject(error)
            );
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return;
        }
      }
      const filteredSpeakers = data?.speakers?.filter(
        (speaker) =>
          speaker.speaker_name ||
          speaker.speaker_designation ||
          speaker.speaker_role ||
          speaker.speaker_image
      );

      const speakersData = await Promise.all(
        filteredSpeakers.map(async (speaker, index) => {
          let speakerImageUrl = speakers[index]?.speaker_image || "";

          if (
            speaker?.speaker_image &&
            typeof speaker.speaker_image === "object"
          ) {
            try {
              speakerImageUrl = await new Promise((resolve, reject) => {
                uploadFileToS3(
                  speaker.speaker_image,
                  (location) => resolve(location),
                  (error) => reject(error)
                );
              });
            } catch (error) {
              console.error(`Failed to upload image for speaker:`, error);
            }
          }

          return {
            speaker_name: speaker?.speaker_name,
            speaker_designation: speaker?.speaker_designation,
            speaker_role: speaker?.speaker_role,
            speaker_image: speakerImageUrl || "",
          };
        })
      );
      const currentDate = moment().startOf("day");
      const startDate = moment(data?.startDate).startOf("day");
      const endDate = moment(data?.endDate).startOf("day");

      let status;
      if (currentDate.isAfter(endDate)) {
        status = "pending";
      } else if (currentDate.isSameOrAfter(startDate)) {
        status = "live";
      } else {
        status = "pending";
      }
      const formData = {
        organiser_name: data.organiser_name,
        organiser_company_name: data.organiser_company_name,
        endTime: data.endTime,
        endDate: data.endDate,
        name: data.name,
        organiser_role: data.organiser_role,
        startTime: data.startTime,
        startDate: data.startDate,
        activate: data.activate,
        type: data.type.value,
        image: imageUrl,
        description: data.description,
        speakers: speakersData,
      };
      if (data?.plaform) {
        formData.plaform = data?.plaform;
      }
      if (type === "offline") {
        formData.venue = data.venue;
      }

      if (data?.meeting_link) {
        formData.meeting_link = data.meeting_link;
      }
      if (eventId) {
        formData.status = status;
        await updateEventById(eventId, formData);
        navigate(`/events/eventlist`);
      } else {
        await createEvent(formData);
        setSelectedTab(0);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      {
        speaker_name: "",
        speaker_designation: "",
        speaker_role: "",
        speaker_image: "",
      },
    ]);
  };
  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const response = await getEventById(eventId);
          const eventData = response.data;
          const updatedEventData = {
            ...eventData,
          };
          setType(updatedEventData.type);
          if (Array.isArray(updatedEventData.speakers)) {
            setSpeakers(updatedEventData.speakers);
            updatedEventData.speakers.forEach((speaker, index) => {
              setValue(
                `speakers[${index}].speaker_name`,
                speaker.speaker_name || ""
              );
              setValue(
                `speakers[${index}].speaker_designation`,
                speaker.speaker_designation || ""
              );
              setValue(
                `speakers[${index}].speaker_role`,
                speaker.speaker_role || ""
              );
              setValue(
                `speakers[${index}].speaker_image`,
                speaker.speaker_image || ""
              );
            });
          }
          reset(updatedEventData);
          setIsChecked(updatedEventData.activate || false);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEventData();
    }
  }, [eventId, reset]);

  const removeSpeaker = (index) => {
    const newSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(newSpeakers);
    setValue("speakers", newSpeakers);
  };

  return (
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Type of event
            </Typography>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Type of event is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Enter Event Type"
                    options={types}
                    {...field}
                    value={types.find((opt) => opt.value === field.value)}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTypeChange(e);
                    }}
                  />
                  {errors.type && (
                    <span style={{ color: "red" }}>{errors.type.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Name of event
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name of event is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the name of event"
                    {...field}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Event Image
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload image here"
                    onChange={(file) => {
                      setImageFile(file);
                      onChange(file);
                    }}
                    ratio={16 / 9}
                    value={value}
                  />
                  {errors.image && (
                    <span style={{ color: "red" }}>{errors.image.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Start Date
            </Typography>
            <Controller
              name="startDate"
              control={control}
              defaultValue={""}
              rules={{ required: " Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select Date from Calender"
                    {...field}
                    value={field.value}
                  />
                  {errors.startDate && (
                    <span style={{ color: "red" }}>
                      {errors.startDate.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Time
            </Typography>
            <Controller
              name="startTime"
              control={control}
              defaultValue=""
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <>
                  <StyledTime
                    label="Select Time"
                    {...field}
                    value={field.value}
                  />
                  {errors.startTime && (
                    <span style={{ color: "red" }}>
                      {errors.startTime.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              End Date
            </Typography>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              rules={{
                required: "End Date is required",
                validate: (value) => {
                  const startDate = moment(
                    getValues("startDate"),
                    "YYYY-MM-DD"
                  );
                  const endDate = moment(value, "YYYY-MM-DD");
                  if (endDate.isBefore(startDate)) {
                    return "End Date cannot be before Start Date";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select End Date"
                    {...field}
                    value={field.value}
                  />
                  {errors.endDate && (
                    <span style={{ color: "red" }}>
                      {errors.endDate.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              End Time
            </Typography>
            <Controller
              name="endTime"
              control={control}
              defaultValue=""
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <>
                  <StyledTime
                    label="Select Time"
                    {...field}
                    value={field.value}
                  />
                  {errors.endTime && (
                    <span style={{ color: "red" }}>
                      {errors.endTime.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          {type === "online" && (
            <>
              <Grid item xs={6}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Virtual platform
                </Typography>
                <Controller
                  name="platform"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Select Virtual Platform"
                        options={option}
                        {...field}
                        value={option.find((opt) => opt.value === field.value)}
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption.value)
                        }
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Add link
                </Typography>
                <Controller
                  name="meeting_link"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Add Meeting Link here"
                        {...field}
                      />
                    </>
                  )}
                />
              </Grid>
            </>
          )}
          {type === "offline" && (
            <Grid item xs={6}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Venue
              </Typography>
              <Controller
                name="venue"
                control={control}
                defaultValue=""
                rules={{ required: "Venue  is required" }}
                render={({ field }) => (
                  <>
                    <StyledInput placeholder="Add Venue here" {...field} />
                  </>
                )}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Organiser name
            </Typography>
            <Controller
              name="organiser_name"
              control={control}
              defaultValue=""
              rules={{ required: "Organiser name  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter organiser name" {...field} />
                  {errors.organiser_name && (
                    <span style={{ color: "red" }}>
                      {errors.organiser_name.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Organiser's company name
            </Typography>
            <Controller
              name="organiser_company_name"
              control={control}
              defaultValue=""
              rules={{ required: "Organiser's company name  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter organiser's company name"
                    {...field}
                  />
                  {errors.organiser_company_name && (
                    <span style={{ color: "red" }}>
                      {errors.organiser_company_name.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Upload image
            </Typography>
            <Controller
              name="guest_image"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Chief guest image here"
                    onChange={onChange}
                    value={value}
                  />
                  {errors.guest_image && (
                    <span style={{ color: "red" }}>
                      {errors.guest_image.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid> */}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Role
            </Typography>
            <Controller
              name="organiser_role"
              control={control}
              defaultValue=""
              rules={{ required: "Role  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter organiser's role"
                    {...field}
                  />
                  {errors.organiser_role && (
                    <span style={{ color: "red" }}>
                      {errors.organiser_role.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Description
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description  is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder={"Enter description"}
                    {...field}
                  />
                  {errors.description && (
                    <span style={{ color: "red" }}>
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          {speakers.map((speaker, index) => (
            <Grid container key={index} spacing={4} padding={4}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={500} color={"#333333"}>
                  Speaker {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_name`}
                  control={control}
                  defaultValue={speaker.speaker_name}
                  render={({ field }) => (
                    <StyledInput placeholder="Speaker Name" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_designation`}
                  control={control}
                  defaultValue={speaker.speaker_designation}
                  render={({ field }) => (
                    <StyledInput placeholder="Speaker Designation" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_role`}
                  control={control}
                  defaultValue={speaker.speaker_role}
                  render={({ field }) => (
                    <StyledInput placeholder="Speaker Role" {...field} />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_image`}
                  control={control}
                  defaultValue={speaker.speaker_image}
                  render={({ field }) => (
                    <>
                      <StyledEventUpload
                        label="Upload Speaker Image here"
                        onChange={(file) => {
                          const updatedSpeakers = [...speakers];
                          updatedSpeakers[index].speaker_image = file;
                          setSpeakers(updatedSpeakers);
                          field.onChange(file);
                        }}
                        value={field.value}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}></Grid>
              <Grid item xs={6} display={"flex"} justifyContent={"end"}>
                <Delete onClick={() => removeSpeaker(index)} />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#004797"}
              onClick={addSpeaker}
            >
              + Add more
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Activate
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Controller
              name="activate"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <>
                  <StyledSwitch
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      handleSwitchChange(e);
                    }}
                  />{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {" "}
            <Stack
              direction={"row"}
              spacing={2}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <StyledButton
                name="Cancel"
                variant="secondary"
                onClick={(event) => handleClear(event)}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name={loading ? "Saving..." : "Save"}
                variant="primary"
                type="submit"
              >
                Save
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
