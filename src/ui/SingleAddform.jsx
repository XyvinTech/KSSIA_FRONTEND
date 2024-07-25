import React, { useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";


import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { StyledCalender } from "../ui/StyledCalender";
import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "./StyledSelectField";

export default function SingleAddform() {
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
              First Name
            </Typography>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the First name" {...field}/>
                  {errors.firstname && (
                    <span style={{ color: "red" }}>{errors.event.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Middle Name
            </Typography>
            <Controller
              name="middlename"
              control={control}
              defaultValue=""
              rules={{ required: "Middle Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Middle Name" {...field} />
                  {errors.middlename && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}{" "}
                </>
              )}
            />
            </Grid>

            <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Last Name
            </Typography>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Last Name" {...field} />
                  {errors.lastname && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}{" "}
                </>
              )}
            />
            </Grid>

            <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Member Id
            </Typography>
            <Controller
              name="memberid"
              control={control}
              defaultValue=""
              rules={{ required: "Member ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Member ID" {...field} />
                  {errors.memeberid && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
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
              Blood Group
            </Typography>
            <Controller
              name="bloodgroup"
              control={control}
              defaultValue=""
              rules={{ required: "Blood group is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Blood Group" {...field} />
                  {errors.bloodgroup&& (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
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
            Photo
            </Typography>{" "}
            <Controller
              name="photo"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Photo"
                    onChange={onChange}
                  />{" "}
                  {errors.photo && (
                    <span style={{ color: "red" }}>{errors.image.message}</span>
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
              color={"#333333"}
            >
            Bio
            </Typography>{" "}
            <Controller
              name="bio"
              control={control}
              defaultValue=""
              rules={{ required: "Add Description" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledMultilineTextField
                    label="Add Description"
                    onChange={onChange}
                  />{" "}
                  {errors.bio && (
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
              Blood Group
            </Typography>
            <Controller
              name="bloodgroup"
              control={control}
              defaultValue=""
              rules={{ required: "Blood group is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Blood Group" {...field} />
                  {errors.bloodgroup&& (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
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
              Phone number
            </Typography>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter personal phone number" {...field} />
                  {errors.phone && (
                    <span style={{ color: "red" }}>{errors.phone.message}</span>
                  )}
                </>
              )}
            />
            <Grid marginTop={2}>
              <Controller
                name="landline"
                control={control}
                defaultValue=""
                rules={{ required: "Landline number is required" }}
                render={({ field }) => (
                  <>
                    <StyledInput placeholder="Enter landline number" {...field} />
                    {errors.landline && (
                      <span style={{ color: "red" }}>{errors.landline.message}</span>
                    )}
                  </>
                )}
              />
            </Grid>
            {additionalPhones.map((_, index) => (
              <Grid marginTop={2} key={index}>
                <Controller
                  name={`additionalPhone${index}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledInput
                      placeholder={`Enter additional phone number ${index + 1}`}
                      {...field}
                    />
                  )}
                />
              </Grid>
            ))}
            <Typography
              onClick={addPhoneNumber}
              sx={{
                color: "#004797",
                cursor: "pointer",
                marginTop: 1,
                fontSize: "0.9rem",
              }}
            >
              + Add more
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Personal Address
            </Typography>
            <Controller
              name="personaladdress"
              control={control}
              defaultValue=""
              rules={{ required: "Personal Address is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Personal Address" {...field} />
                  {errors.personaladdress && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
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
             Company Name
            </Typography>
            <Controller
              name="companyname"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the name of Company"
                    {...field}
                  />
                  {errors.companyname && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
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
             Company Phone
            </Typography>
            <Controller
              name="companyphone"
              control={control}
              defaultValue=""
              rules={{ required: "Number is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the phone number"
                    {...field}
                  />
                  {errors.companyphone && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the members designation"
                    {...field}
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
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
             Company E mail
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the company email id"
                    {...field}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
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
             Website
            </Typography>
            <Controller
              name="report"
              control={control}
              defaultValue=""
              rules={{ required: "Website is required" }}
              render={({ field }) => (
                <>
                   <StyledInput
                    placeholder="Enter the link here"
                    {...field}
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the members designation"
                    {...field}
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Business category
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Enter the company email-id" options={option} {...field} 
                    
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Subcategory
            </Typography>
            <Controller
              name="subcategory"
              control={control}
              defaultValue=""
              rules={{ required: "link is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Link is required" options={option} {...field} 
                    
                  />
                  {errors.subcategory && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
             Status
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Active" options={option} {...field} 
                    
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
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
     













