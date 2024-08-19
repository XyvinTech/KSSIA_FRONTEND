import React, { useState,useEffect } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledEventUpload } from "../ui/StyledEventUpload.jsx";
import { StyledButton } from "../ui/StyledButton.jsx";
import {StyledTime} from "../ui/StyledTime.jsx"
import { StyledCalender } from "../ui/StyledCalender.jsx";
import StyledInput from "../ui/StyledInput.jsx";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField.jsx";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import {createEvent,getEventById,updateEventById} from "/src/api/events-api.js";



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
  const [speakers, setSpeakers] = useState([{ speaker_name: "", speaker_designation: "", speaker_image: "", speaker_role: "" }]);
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const removeIdFields = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(removeIdFields);
    }
    if (typeof obj === 'object' && obj !== null) {
      const { _id,createdAt,updatedAt,__v, ...rest } = obj;
      return Object.keys(rest).reduce((acc, key) => {
        acc[key] = removeIdFields(rest[key]); 
        return acc;
      }, {});
    }
    return obj;
  };

  const onSubmit = async(data) => {
    try {
      const cleanedData = removeIdFields(data);
      const formData = {
        ...cleanedData,
        speakers: removeIdFields(speakers)
      };
      
      if (eventId) {
        await updateEventById(eventId, formData); 
      } else {
        await createEvent(formData);
        reset({
          type: '',
          name: '',
          image: '',
          date: '',
          time: '',
          platform: '',
          meeting_link: '',
          organiser_name: '',
          organiser_company_name: '',
          guest_image: '',
          organiser_role: '',
          activate: false,
        });
        setSpeakers([{ speaker_name: "", speaker_designation: "", speaker_image: "", speaker_role: "" }]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const addSpeaker = () => {
    setSpeakers([...speakers, { speaker_name: "", speaker_designation: "", speaker_image: "", speaker_role: "" }]);
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

  // const handleSpeakerChange = (index, field, value) => {
  //   const newSpeakers = [...speakers];
  //   newSpeakers[index][field] = value;
  //   setSpeakers(newSpeakers);
  // };

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
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"4px"}>
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
                    value={option.find(opt => opt.value === field.value)}
                    onChange={(selectedOption) => field.onChange(selectedOption.value)}
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
                  <StyledInput placeholder="Enter the name of event" {...field}/>
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
              render={({ field: { onChange,value } }) => (
                <>
                  <StyledEventUpload
                    label = "Upload image here"
                    onChange = {onChange}
                    value = {value}
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
              Date 
            </Typography>
            <Controller
              name="date"
              control={control}
              defaultValue={''}
              rules={{ required: " Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender label="Select Date from Calender" 
                  {...field}
                  value={field.value}
                  />
                  {errors.date && (
                    <span style={{ color: "red" }}>{errors.date.message}</span>
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
              name="time"
              control={control}
              defaultValue=""
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <>
                  <StyledTime label="Select Time" 
                  {...field}
                  value={field.value}
                   />
                  {errors.time && (
                    <span style={{ color: "red" }}>{errors.time.message}</span>
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
                    value={option.find(opt => opt.value === field.value)}
                    onChange={(selectedOption) => field.onChange(selectedOption.value)}
                  />
                  {errors.platform && (
                    <span style={{ color: "red" }}>{errors.platform.message}</span>
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
                  <StyledInput placeholder="Add Meeting Link here" {...field}/>
                  {errors.meeting_link && (
                    <span style={{ color: "red" }}>{errors.meeting_link.message}</span>
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
                  <StyledInput placeholder="Enter organiser name" {...field}/>
                  {errors.organiser_name && (
                    <span style={{ color: "red" }}>{errors.organiser_name.message}</span>
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
                  <StyledInput placeholder="Enter organiser's company name" {...field}/>
                  {errors.organiser_company_name && (
                    <span style={{ color: "red" }}>{errors.organiser_company_name.message}</span>
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
              render={({ field: { onChange,value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Chief guest image here"
                    onChange={onChange}
                    value={value}
                  />
                  {errors.guest_image && (
                    <span style={{ color: "red" }}>{errors.guest_image.message}</span>
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
                  <StyledInput placeholder="Enter speaker's role" {...field}/>
                  {errors.organiser_role && (
                    <span style={{ color: "red" }}>{errors.organiser_role.message}</span>
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
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Add speaker name
            </Typography>
            {/* <Controller
              name="speaker.speaker_name"
              control={control}
              defaultValue=""
              rules={{ required: "Speaker name  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker name" {...field}/>
                  {errors.speaker_name && (
                    <span style={{ color: "red" }}>{errors.speaker_name.message}</span>
                  )}
                </>
              )}
            /> */}
            <StyledInput
               placeholder="Enter speaker name"
               value={speaker.speaker_name}
               onChange={(e) => handleSpeakerChange(index, "speaker_name", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Add speaker designation
            </Typography>
            {/* <Controller
              name="speaker_designation"
              control={control}
              defaultValue=""
              rules={{ required: "Speaker designstion  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker designation" {...field}/>
                  {errors.speaker_designation && (
                    <span style={{ color: "red" }}>{errors.speaker_designation.message}</span>
                  )}
                </>
              )}
            /> */}
             <StyledInput
                  placeholder="Enter speaker designation"
                  value={speaker.speaker_designation}
                  onChange={(e) => handleSpeakerChange(index, "speaker_designation", e.target.value)}
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
            {/* <Controller
              name="speaker_image"
              control={control}
              defaultValue=""
              // rules={{ required: "Image is required" }}
              render={({ field: { onChange,value } }) => (
                <>
                  <StyledEventUpload
                  label="Upload Chief guest image here"
                  onChange={(e) => {
                        handleSpeakerChange(index, "speaker_image", e);
                  }}
                  value={speaker.speaker_image}
                  />
                  {errors.speaker_image && (
                    <span style={{ color: "red" }}>{errors.speaker_image.message}</span>
                  )}
                </>
              )}
            />  */}
            <StyledEventUpload
                  label="Upload Chief guest image here"
                  onChange={(e) => {
                        handleSpeakerChange(index, "speaker_image", e);
                  }}
                  value={speaker.speaker_image}
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
            {/* <Controller
              name="speaker_role"
              control={control}
              defaultValue=""
              rules={{ required: "Role  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker's role" {...field}/>
                  {errors.speaker_role && (
                    <span style={{ color: "red" }}>{errors.speaker_role.message}</span>
                  )}
                </>
              )}
            /> */}
            <StyledInput
                  placeholder="Enter speaker's role"
                  value={speaker.speaker_role}
                  onChange={(e) => handleSpeakerChange(index, "speaker_role", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}></Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
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
              <Grid item xs={6} style={{ textAlign: 'right' }}> 
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
