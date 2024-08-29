import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
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

export default function AddEvent({ eventId }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([]);
  const [dateValue, setDate] = useState("");
  const [speakers, setSpeakers] = useState([
    {
      speaker_name: "",
      speaker_designation: "",
      speaker_role: "",
    },
  ]);
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("organiser_name", data.organiser_name);
    formData.append("organiser_company_name", data.organiser_company_name);
    formData.append("endTime", data.endTime);
    formData.append("endDate", data.endDate);
    formData.append("name", data.name);
    formData.append("organiser_role", data.organiser_role);
    formData.append("startTime", data.startTime);
    formData.append("startDate", data.startDate);
    formData.append("platform", data.platform);
    formData.append("activate", data.activate);
    formData.append("speakers", JSON.stringify(data.speakers));
    formData.append("type", "webinar");
    formData.append("description", data.description);
    formData.append("meeting_link", data.meeting_link);

    if (eventId) {
      await updateEventById(eventId, formData);
    } else {
      await createEvent(formData);
      console.log(formData);
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

          reset(updatedEventData);
          setSpeakers(updatedEventData.speakers || []);
          setIsChecked(updatedEventData.activate || false);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEventData();
    }
  }, [eventId, reset]);

  const handleSpeakerChange = (index, field, value) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = {
      ...updatedSpeakers[index],
      [field]: value,
    };
    setSpeakers(updatedSpeakers);
  };

  const removeSpeaker = (index) => {
    const newSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(newSpeakers);
  };

  const addPhoneNumber = () => {
    setAdditionalPhones([...additionalPhones, ""]);
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
                    options={option}
                    {...field}
                    value={option.find((opt) => opt.value === field.value)}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.value)
                    }
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
                    onChange={onChange}
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
              defaultValue={""}
              rules={{ required: " Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select Date from Calender"
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
              rules={{ required: "Virtual platform is required" }}
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
                  {errors.platform && (
                    <span style={{ color: "red" }}>
                      {errors.platform.message}
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
              Add link
            </Typography>
            <Controller
              name="meeting_link"
              control={control}
              defaultValue=""
              rules={{ required: "Link  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Add Meeting Link here" {...field} />
                  {errors.meeting_link && (
                    <span style={{ color: "red" }}>
                      {errors.meeting_link.message}
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
          <Grid item xs={6}>
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
          </Grid>
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
                  <StyledInput placeholder="Enter speaker's role" {...field} />
                  {errors.organiser_role && (
                    <span style={{ color: "red" }}>
                      {errors.organiser_role.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          {/* <Grid item xs={6} style={{ textAlign: 'right' }} >
            <Delete/>
          </Grid> */}

          {speakers.map((speaker, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Speaker {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_name`}
                  control={control}
                  defaultValue={speaker.speaker_name}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Speaker Name"
                        {...field}
                        value={speaker.speaker_name}
                        onChange={(e) =>
                          handleSpeakerChange(
                            index,
                            "speaker_name",
                            e.target.value
                          )
                        }
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_designation`}
                  control={control}
                  defaultValue={speaker.speaker_designation}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Speaker Designation"
                        {...field}
                        value={speaker.speaker_designation}
                        onChange={(e) =>
                          handleSpeakerChange(
                            index,
                            "speaker_designation",
                            e.target.value
                          )
                        }
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_role`}
                  control={control}
                  defaultValue={speaker.speaker_role}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Speaker Role"
                        {...field}
                        value={speaker.speaker_role}
                        onChange={(e) =>
                          handleSpeakerChange(
                            index,
                            "speaker_role",
                            e.target.value
                          )
                        }
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Delete onClick={() => removeSpeaker(index)} />
              </Grid>
            </React.Fragment>
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
              rules={{ required: "Activate is required" }}
              render={({ field }) => (
                <>
                  <StyledSwitch
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      handleSwitchChange(e);
                    }}
                  />{" "}
                  {errors.activate && (
                    <span style={{ color: "red" }}>
                      {errors.activate.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                style={{ width: "auto" }}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name="Save"
                variant="primary"
                type="submit"
                style={{ width: "auto" }}
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
