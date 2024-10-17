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
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField .jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddEvent({ eventId, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };
  const handleClear = (event) => {
    event.preventDefault();
    setSelectedTab(0);
    reset();
    setSpeakerImages([]);
    navigate(-1);
  };
  const [speakerImages, setSpeakerImages] = useState([]);
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

  const option = [{ value: "gmeet", label: "Gmeet" }];

  const types = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);

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
      formData.append("type", data.type.value);
      formData.append("image", data.image);
      if (type === "offline") {
        formData.append("venue", data.venue);
      }

      formData.append("description", data.description);
      formData.append("meeting_link", data.meeting_link);

      // Handle speakers: Keep existing image if no new image is provided
      const speakersWithRetainedImages = data.speakers.map((speaker, index) => {
        // Check if a new image has been uploaded for this speaker
        if (speakerImages[index]) {
          // If new image exists, exclude the old image field and upload the new image
          const { speaker_image, ...rest } = speaker;
          return rest;
        } else {
          // If no new image, keep the old image
          return speaker;
        }
      });

      // Append speakers (without new images) to formData as JSON
      formData.append("speakers", JSON.stringify(speakersWithRetainedImages));

      // Append new speaker images separately if they exist
      speakerImages.forEach((image, index) => {
        if (image) {
          formData.append(`speaker_images`, image); // Append only new images
        }
      });

      // Update or create event
      if (eventId) {
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
      },
    ]);
  };
  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const response = await getEventById(eventId);
          const eventData = response.data;

          // Extract speaker images from the event's speaker data
          const speakerImagesFromAPI = (eventData.speakers || []).map(
            (speaker) => speaker.speaker_image // Assuming `speaker_image` is the field name
          );

          // Set the speakers and speaker images in the state
          setSpeakers(eventData.speakers || []);
          setSpeakerImages(speakerImagesFromAPI);

          // Set form fields including other event data
          reset({
            ...eventData,
            speakers: eventData.speakers || [], // Pre-fill speakers
            activate: eventData.activate || false, // Pre-fill switch state
          });

          setIsChecked(eventData.activate || false); // Set initial checked state for switch
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEventData();
    }
  }, [eventId, reset]);

  const handleSpeakerChange = (index, field, value) => {
    setSpeakers((prevSpeakers) => {
      const updatedSpeakers = [...prevSpeakers];
      updatedSpeakers[index] = {
        ...updatedSpeakers[index],
        [field]: value,
      };
      return updatedSpeakers;
    });
  };
  const handleSpeakerImageChange = (index, file) => {
    const newSpeakerImages = [...speakerImages];
    newSpeakerImages[index] = file;
    setSpeakerImages(newSpeakerImages);
  };

  const removeSpeaker = (index) => {
    const newSpeakers = speakers.filter((_, i) => i !== index);
    const newSpeakerImages = speakerImages.filter((_, i) => i !== index);
    setSpeakers(newSpeakers);
    setSpeakerImages(newSpeakerImages);
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
                  <StyledInput placeholder="Enter speaker's role" {...field} />
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
            <React.Fragment key={index}>
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
              {eventId ? (
                <Grid item xs={6}>
                  <Controller
                    name={`speakers[${index}].speaker_image`}
                    control={control}
                    defaultValue={speaker.speaker_image || ""}
                    render={({ field: { onChange, value } }) => (
                      <StyledEventUpload
                        label="Upload Speaker Image here"
                        onChange={(file) => {
                          handleSpeakerImageChange(index, file);
                          onChange(file);
                        }}
                        value={value}
                      />
                    )}
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Controller
                    name={`speaker_images[${index}]`}
                    control={control}
                    defaultValue={speaker.speaker_image}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <StyledEventUpload
                          label="Upload Speaker Image here"
                          onChange={(file) => {
                            handleSpeakerImageChange(index, file);
                            onChange(file);
                          }}
                          value={value}
                        />
                      </>
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={6}></Grid>
              <Grid item xs={6} display={"flex"} justifyContent={"end"}>
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
