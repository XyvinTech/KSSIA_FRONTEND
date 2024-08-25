import React, { useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import CONSTANTS from "../constants";
import { createMember } from "../api/members-api";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios-interceptor";
export default function SingleAddform() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([]);
  const [addMoreDisabled, setAddMoreDisabled] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(
      "name",
      JSON.stringify({
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
      })
    );

    const phoneNumbers = {
      personal: data.phone_number,
      landline: data.landline,
      company_phone_number: data.company_phone_number,
      whatsapp_number: data.whatsapp_number,
      whatsapp_business_number: data.whatsapp_business_number,
    };
    formData.append("phone_numbers", JSON.stringify(phoneNumbers));
    formData.append("membership_id", data.membership_id);
    formData.append("blood_group", data.blood_group);
    formData.append("designation", data.designation);
    formData.append("email", data.email);
    formData.append("company_name", data.company_name);
    formData.append("address", data.address);
    formData.append("bio", data.bio);
    formData.append("company_email", data.company_email);
    formData.append("business_category", data.business_category.value);
    formData.append("sub_category", data.sub_category.value);
    try {
      const resp = await axiosInstance.post(CONSTANTS.MEMBERS_API, formData);
      if (resp.status === 201) {
        navigate("/members");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPhoneNumber = () => {
    setAdditionalPhones((prevPhones) => {
      const newPhones = [...prevPhones];

      if (newPhones.length === 0) {
        newPhones.push({ name: "WhatsApp Number", key: "whatsapp_number" });
      } else if (newPhones.length === 1) {
        newPhones.push({
          name: "WhatsApp Business Number",
          key: "whatsapp_business_number",
        });
      }

      if (newPhones.length === 3) {
        setAddMoreDisabled(true);
      }

      return newPhones;
    });
  };

  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
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
              First Name
            </Typography>
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the First name" {...field} />
                  {errors.firstname && (
                    <span style={{ color: "red" }}>
                      {errors.firstname.message}
                    </span>
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
              Middle Name
            </Typography>
            <Controller
              name="middle_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Middle Name" {...field} />
                  {errors.middlename && (
                    <span style={{ color: "red" }}>
                      {errors.middlename.message}
                    </span>
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
              Last Name
            </Typography>
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Last Name" {...field} />
                  {errors.lastname && (
                    <span style={{ color: "red" }}>
                      {errors.lastname.message}
                    </span>
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
              Member ID
            </Typography>
            <Controller
              name="membership_id"
              control={control}
              defaultValue=""
              rules={{ required: "Member ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Member ID" {...field} />
                  {errors.memberid && (
                    <span style={{ color: "red" }}>
                      {errors.memberid.message}
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
              Blood Group
            </Typography>
            <Controller
              name="blood_group"
              control={control}
              defaultValue=""
              // rules={{ required: "Blood group is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Blood Group" {...field} />
                  {errors.bloodgroup && (
                    <span style={{ color: "red" }}>
                      {errors.bloodgroup.message}
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
              Photo
            </Typography>
            <Controller
              name="profile_picture"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload label="Upload Photo" onChange={onChange} />
                  {errors.photo && (
                    <span style={{ color: "red" }}>{errors.photo.message}</span>
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
            </Typography>
            <Controller
              name="bio"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <>
                  <StyledMultilineTextField
                    label="Add Description"
                    onChange={onChange}
                  />
                  {errors.bio && (
                    <span style={{ color: "red" }}>{errors.bio.message}</span>
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
              Email ID
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Email ID" {...field} />
                  {errors.emails && (
                    <span style={{ color: "red" }}>
                      {errors.emails.message}
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
              Phone number
            </Typography>
            <Controller
              name="phone_number"
              control={control}
              defaultValue=""
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter personal phone number"
                    {...field}
                  />
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
                // rules={{ required: "Landline number is required" }}
                render={({ field }) => (
                  <>
                    <StyledInput
                      placeholder="Enter landline number"
                      {...field}
                    />
                    {errors.landline && (
                      <span style={{ color: "red" }}>
                        {errors.landline.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Grid>
            {additionalPhones.map((phone) => (
              <Grid marginTop={2} key={phone.key}>
                <Controller
                  name={phone.key}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder={`Enter ${phone.name.toLowerCase()}`}
                        {...field}
                      />
                    </>
                  )}
                />
              </Grid>
            ))}
            <Typography
              onClick={addPhoneNumber}
              display={addMoreDisabled ? "none" : ""}
              sx={{
                color: "#004797",
                cursor: addMoreDisabled ? "default" : "pointer",
                marginTop: 1,
                fontSize: "0.9rem",
                textDecoration: addMoreDisabled ? "line-through" : "none",
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
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: "Personal Address is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the Personal Address"
                    {...field}
                  />
                  {errors.address && (
                    <span style={{ color: "red" }}>
                      {errors.address.message}
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
              Company Name
            </Typography>
            <Controller
              name="company_name"
              control={control}
              defaultValue=""
              rules={{ required: "Company Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the name of Company"
                    {...field}
                  />
                  {errors.companyname && (
                    <span style={{ color: "red" }}>
                      {errors.companyname.message}
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
              Company Phone
            </Typography>
            <Controller
              name="company_phone_number"
              control={control}
              defaultValue=""
              rules={{ required: "Company Phone is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the phone number"
                    {...field}
                  />
                  {errors.company_phone_number && (
                    <span style={{ color: "red" }}>
                      {errors.company_phone_number.message}
                    </span>
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
                    placeholder="Enter the member's designation"
                    {...field}
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>
                      {errors.designation.message}
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
              Company Email
            </Typography>
            <Controller
              name="company_email"
              control={control}
              defaultValue=""
              rules={{ required: "Company Email is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the company email id"
                    {...field}
                  />
                  {errors.companyemail && (
                    <span style={{ color: "red" }}>
                      {errors.companyemail.message}
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
              Website
            </Typography>
            <Controller
              name="websites"
              control={control}
              defaultValue=""
              // rules={{ required: "Website is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the website link"
                    {...field}
                  />
                  {errors.website && (
                    <span style={{ color: "red" }}>
                      {errors.website.message}
                    </span>
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
              Business category
            </Typography>
            <Controller
              name="business_category"
              control={control}
              defaultValue=""
              rules={{ required: "Business category is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select business category"
                    options={option}
                    {...field}
                  />
                  {errors.businesscategory && (
                    <span style={{ color: "red" }}>
                      {errors.businesscategory.message}
                    </span>
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
              Subcategory
            </Typography>
            <Controller
              name="sub_category"
              control={control}
              defaultValue=""
              rules={{ required: "Subcategory is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select subcategory"
                    options={option}
                    {...field}
                  />
                  {errors.subcategory && (
                    <span style={{ color: "red" }}>
                      {errors.subcategory.message}
                    </span>
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
              Status
            </Typography>
            <Controller
              name="status"
              control={control}
              defaultValue=""
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select status"
                    options={option}
                    {...field}
                  />
                  {errors.status && (
                    <span style={{ color: "red" }}>
                      {errors.status.message}
                    </span>
                  )}
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
