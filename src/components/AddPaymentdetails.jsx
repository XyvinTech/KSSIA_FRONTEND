import React, { useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledCalender } from "../ui/StyledCalender.jsx";
import {StyledTime} from "../ui/StyledTime.jsx"

export default function AddPaymentdetails() {
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
        <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Name of the member
            </Typography>
            <Controller
              name="member"
              control={control}
              defaultValue=""
              rules={{ required: "Member name is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Enter member name"
                    options={option}
                    {...field}
                  />
                  {errors.member && (
                    <span style={{ color: "red" }}>{errors.member.message}</span>
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
              Member ID
            </Typography>
            <Controller
              name="memberid"
              control={control}
              defaultValue=""
              rules={{ required: "Member ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Member ID" {...field}/>
                  {errors.memberid && (
                    <span style={{ color: "red" }}>{errors.memberid.message}</span>
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
             Amount
            </Typography>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the payment " {...field}/>
                  {errors.amount && (
                    <span style={{ color: "red" }}>{errors.amount.message}</span>
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
             Mode of Payment
            </Typography>
            <Controller
              name="modeofp"
              control={control}
              defaultValue=""
              rules={{ required: "Mode of payment is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the mode of payment " {...field}/>
                  {errors.modeofp && (
                    <span style={{ color: "red" }}>{errors.modeofp.message}</span>
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
             Category
            </Typography>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Payment Category is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the payment category" {...field}/>
                  {errors.category && (
                    <span style={{ color: "red" }}>{errors.category.message}</span>
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
             Status
            </Typography>
            <Controller
              name="statusofpayment"
              control={control}
              defaultValue=""
              rules={{ required: "Status of payment is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Status of payment " {...field}/>
                  {errors.statusofpayment && (
                    <span style={{ color: "red" }}>{errors.statusofpayment.message}</span>
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
             Upload invoice
            </Typography>
            <Controller
              name="photos"
              control={control}
              defaultValue=""
              rules={{ required: "Invoice image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload ivoice"
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
            Remarks
            </Typography>
            <Controller
              name="modeofp"
              control={control}
              defaultValue=""
              rules={{ required: "Remarks is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Add any Remarks " {...field}/>
                  {errors.modeofp && (
                    <span style={{ color: "red" }}>{errors.modeofp.message}</span>
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