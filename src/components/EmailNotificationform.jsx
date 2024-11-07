import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, FormHelperText } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import DropZoneforForm from "../ui/DropzoneforForm";
import { useNotificationStore } from "../store/notificationStore";
import { useDropDownStore } from "../store/dropDownStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";

export default function EmailNotificationform({ setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { users, fetchUsers } = useDropDownStore();
  const { addEmailNotifications } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let filter = {};
    filter.limit = "full";
    fetchUsers(filter);
  }, []);

  const watchedToField = watch("to");

  const allOptions =
    users && Array.isArray(users)
      ? [
          { value: "*", label: "All" },
          ...users.map((user) => ({
            value: user._id,
            label: `${user.name.first_name} ${user.name.middle_name} ${user.name.last_name}`,
          })),
        ]
      : [];

  const filteredOptions = watchedToField?.some((option) => option.value === "*")
    ? [{ value: "*", label: "All" }]
    : allOptions;

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      let userIds = data.to.map((user) => user.value);

      if (userIds.includes("*")) {
        formData.append("to", "*");
      } else {
        userIds.forEach((id) => {
          formData.append("to", id);
        });
      }
      formData.append("subject", data?.subject);
      formData.append("content", data?.content);
      formData.append("link_url", data?.link_url);
      if (data?.media_url) {
        formData.append("media_url", data.media_url);
      }

      await addEmailNotifications(formData);
      reset();
      setSelectedTab(2);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
              Send to
            </Typography>
            <Controller
              name="to"
              control={control}
              defaultValue={[]}
              rules={{ required: "Member is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select member"
                    options={filteredOptions}
                    isMulti
                    {...field}
                  />
                  {errors.to && (
                    <span style={{ color: "red" }}>{errors.to.message}</span>
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
              Subject
            </Typography>
            <Controller
              name="subject"
              control={control}
              defaultValue=""
              rules={{ required: "Subject is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter subject line" {...field} />
                  {errors.subject && (
                    <span style={{ color: "red" }}>
                      {errors.subject.message}
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
              Content
            </Typography>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{ required: "Message is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledMultilineTextField
                    label="Add message"
                    onChange={onChange}
                  />
                  {errors.content && (
                    <span style={{ color: "red" }}>
                      {errors.content.message}
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
              Upload photo
            </Typography>
            <Controller
              name="media_url"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledEventUpload
                    label="Upload your file"
                    onChange={(selectedFile) => {
                      field.onChange(selectedFile);
                    }}
                  />
                  <FormHelperText sx={{ color: "#757575" }}>
                    Image must be under 1 MB
                  </FormHelperText>
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
              Add Link
            </Typography>
            <Controller
              name="link_url"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput placeholder="Paste link here" {...field} />
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                onClick={handleClear}
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
