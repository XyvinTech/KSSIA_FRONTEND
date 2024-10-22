import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import CONSTANTS from "../constants";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios-interceptor";
import { useMemberStore } from "../store/member-store";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function SingleAddform() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setIsLoading] = useState(false);
  const location = useLocation();
  const { memberId, isUpdate } = location.state || {};
  const [additionalPhones, setAdditionalPhones] = useState([]);
  const [addMoreDisabled, setAddMoreDisabled] = useState(false);
  const { addMembers, fetchUserById, member, editUser, loadings } =
    useMemberStore();
  useEffect(() => {
    if (isUpdate && memberId) {
      fetchUserById(memberId);
    }
  }, [memberId, isUpdate, fetchUserById]);

  useEffect(() => {
    if (member && isUpdate) {
      setValue("first_name", member?.name?.first_name);
      setValue("middle_name", member?.name?.middle_name);
      setValue("last_name", member?.name?.last_name);
      setValue("membership_id", member?.membership_id);
      setValue("blood_group", member?.blood_group);
      setValue("designation", member?.designation);
      setValue("email", member?.email);
      setValue("company_name", member?.company_name);
      setValue("address", member?.address);
      setValue("bio", member?.bio);
      setValue("company_email", member?.company_email);
      setValue("phone_number", member?.phone_numbers?.personal);
      setValue("landline", member?.phone_numbers?.landline);
      if (Array.isArray(member?.websites)) {
        const websiteUrls = member.websites.map((site) => site.url);
        setValue("websites", websiteUrls);
      }
      setValue(
        "company_phone_number",
        member?.phone_numbers?.company_phone_number
      );
      setValue("whatsapp_number", member?.phone_numbers?.whatsapp_number);
      setValue(
        "whatsapp_business_number",
        member?.phone_numbers?.whatsapp_business_number
      );

      const selectedBusinessCategory = business.find(
        (item) => item.value === member.business_category
      );
      setValue("business_category", selectedBusinessCategory || "");
      const selectedSubCategory = sub.find(
        (item) => item.value === member.sub_category
      );

      setValue("sub_category", selectedSubCategory || "");
      const selectedStatus = status.find(
        (item) => item.value === member.status
      );

      setValue("status", selectedStatus || "");
      if (member?.phone_numbers?.whatsapp_number) {
        setAdditionalPhones([
          { name: "WhatsApp Number", key: "whatsapp_number" },
        ]);
      }
      if (member?.phone_numbers?.whatsapp_business_number) {
        setAdditionalPhones((prev) => [
          ...prev,
          { name: "WhatsApp Business Number", key: "whatsapp_business_number" },
        ]);
      }
    }
  }, [member, isUpdate, setValue]);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const memberData = {
        name: {
          first_name: data.first_name,
          ...(data.middle_name && { middle_name: data.middle_name }),
          last_name: data.last_name,
        },
        websites: Array.isArray(data.websites)
          ? data.websites.map((url) => ({ url }))
          : data.websites
          ? [{ url: data.websites }]
          : [],
        phone_numbers: {
          personal: data.phone_number ? data.phone_number : undefined,
          landline: data.landline ? data.landline : undefined,
          company_phone_number: data.company_phone_number
            ? data.company_phone_number
            : undefined,
          whatsapp_number: data.whatsapp_number
            ? data.whatsapp_number
            : undefined,
          whatsapp_business_number: data.whatsapp_business_number
            ? data.whatsapp_business_number
            : undefined,
        },
        blood_group: data.blood_group,
        designation: data.designation,
        email: data.email,
        company_name: data.company_name,
        address: data.address,
        bio: data.bio,
        company_email: data.company_email,
        business_category: data.business_category.value,
        status: data.status.value,
        sub_category: data.sub_category.value,
      };

      if (!isUpdate) {
        memberData.membership_id = data.membership_id;
      }

      if (isUpdate && memberId) {
        await editUser(memberId, memberData);
        navigate("/members");
      } else {
        await addMembers(memberData);
        navigate("/members");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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

  const business = [{ value: "IT Services", label: "IT Services" }];
  const sub = [
    { value: "Software Development", label: "Software Development" },
  ];
  const status = [
    { value: "active", label: "active" },
    { value: "inactive", label: "inactive" },
    { value: "suspended", label: "suspended" },
    { value: "notice", label: "notice" },
  ];
  return (
    <>
      {loadings ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"800px"}
          sx={{ bgcolor: "white" }}
        />
      ) : (
        <>
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
                        <StyledInput
                          placeholder="Enter the First name"
                          {...field}
                        />
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
                        <StyledInput
                          placeholder="Enter the Middle Name"
                          {...field}
                        />
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
                        <StyledInput
                          placeholder="Enter the Last Name"
                          {...field}
                        />
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
                        <StyledInput
                          placeholder="Enter the Member ID"
                          {...field}
                        />
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
                        <StyledInput
                          placeholder="Enter the Blood Group"
                          {...field}
                        />
                        {errors.bloodgroup && (
                          <span style={{ color: "red" }}>
                            {errors.bloodgroup.message}
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
                    Bio
                  </Typography>
                  <Controller
                    name="bio"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledMultilineTextField
                          label="Add Description"
                          {...field}
                        />
                        {errors.bio && (
                          <span style={{ color: "red" }}>
                            {errors.bio.message}
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
                    Email ID
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email ID is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder="Enter the Email ID"
                          {...field}
                        />
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
                          <span style={{ color: "red" }}>
                            {errors.phone.message}
                          </span>
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
                          options={business}
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
                          options={sub}
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
                          options={status}
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
                <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                  {" "}
                  <Stack direction={"row"} spacing={2}>
                    <StyledButton
                      name="Cancel"
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                      }}
                    >
                      Cancel
                    </StyledButton>
                    <StyledButton
                      name={loading ? "Saving..." : "Save"}
                      variant="primary"
                      type="submit"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </Box>
        </>
      )}
    </>
  );
}
