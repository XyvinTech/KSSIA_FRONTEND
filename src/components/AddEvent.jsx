import React, { useState } from "react";
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


export default function AddEvent() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([]);

  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const onSubmit = (data) => {
    console.log("Form data:", data);
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
              name="event"
              control={control}
              defaultValue=""
              rules={{ required: "Type of event is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Online"
                    options={option}
                    {...field}
                  />
                  {errors.event && (
                    <span style={{ color: "red" }}>{errors.event.message}</span>
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
              name="event"
              control={control}
              defaultValue=""
              rules={{ required: "Name of event is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the name of event" {...field}/>
                  {errors.event && (
                    <span style={{ color: "red" }}>{errors.event.message}</span>
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
              name="photo"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload image here"
                    onChange={onChange}
                  />
                  {errors.photo && (
                    <span style={{ color: "red" }}>{errors.photo.message}</span>
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
              defaultValue=""
              rules={{ required: " Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender label="Select Date from Calender" {...field} />
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
                  <StyledTime label="Select Time" {...field} />
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
              name="virtual"
              control={control}
              defaultValue=""
              rules={{ required: "Virtual platform is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Online"
                    options={option}
                    {...field}
                  />
                  {errors.virtual && (
                    <span style={{ color: "red" }}>{errors.virtual.message}</span>
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
              name="link"
              control={control}
              defaultValue=""
              rules={{ required: "Link  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Add Meeting Link here" {...field}/>
                  {errors.link && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
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
              name="ogname"
              control={control}
              defaultValue=""
              rules={{ required: "Organiser name  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter organiser name" {...field}/>
                  {errors.ogname && (
                    <span style={{ color: "red" }}>{errors.ogname.message}</span>
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
              name="ogcompname"
              control={control}
              defaultValue=""
              rules={{ required: "Organiser's company name  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter organiser's company name" {...field}/>
                  {errors.ogcompname && (
                    <span style={{ color: "red" }}>{errors.ogcompname.message}</span>
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
              name="photos"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Chief guest image here"
                    onChange={onChange}
                  />
                  {errors.photos && (
                    <span style={{ color: "red" }}>{errors.photos.message}</span>
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
              name="roles"
              control={control}
              defaultValue=""
              rules={{ required: "Role  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker's role" {...field}/>
                  {errors.roles && (
                    <span style={{ color: "red" }}>{errors.roles.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }} >
            <Delete/>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Add speaker name
            </Typography>
            <Controller
              name="spr"
              control={control}
              defaultValue=""
              rules={{ required: "Speaker name  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker name" {...field}/>
                  {errors.spr && (
                    <span style={{ color: "red" }}>{errors.spr.message}</span>
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
             Add speaker designation
            </Typography>
            <Controller
              name="des"
              control={control}
              defaultValue=""
              rules={{ required: "Speaker designstion  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker designation" {...field}/>
                  {errors.des && (
                    <span style={{ color: "red" }}>{errors.des.message}</span>
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
              name="chiefphoto"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Chief guest image here"
                    onChange={onChange}
                  />
                  {errors.chiefphoto && (
                    <span style={{ color: "red" }}>{errors.chiefphoto.message}</span>
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
              name="des"
              control={control}
              defaultValue=""
              rules={{ required: "Role  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter speaker's role" {...field}/>
                  {errors.des && (
                    <span style={{ color: "red" }}>{errors.des.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#004797"}
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
