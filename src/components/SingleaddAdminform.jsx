import React, { useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledSwitch from "../ui/StyledSwitch.jsx";

import { StyledButton } from "../ui/StyledButton";

import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";

export default function SingleaddAdminform() {
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
              Name of the Person
            </Typography>
            <Controller
              name="person"
              control={control}
              defaultValue=""
              rules={{ required: "Person name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter person name" {...field} />
                  {errors.person && (
                    <span style={{ color: "red" }}>
                      {errors.person.message}
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
              Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Designation" {...field} />
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
              Role
            </Typography>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select role"
                    options={option}
                    {...field}
                  />
                  {errors.role && (
                    <span style={{ color: "red" }}>{errors.role.message}</span>
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
              name="desc"
              control={control}
              defaultValue=""
              rules={{ required: "Email ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the email ID" {...field} />
                  {errors.desc && (
                    <span style={{ color: "red" }}>{errors.desc.message}</span>
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
              name="actual"
              control={control}
              defaultValue=""
              rules={{ required: "Phone number  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="ENter phone number" {...field} />
                  {errors.actual && (
                    <span style={{ color: "red" }}>
                      {errors.actual.message}
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
