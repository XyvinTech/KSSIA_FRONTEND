import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import DropZoneforForm from "../ui/DropzoneforForm";
import { useNotificationStore } from "../store/notificationStore";
import { useDropDownStore } from "../store/dropDownStore";
import { toast } from "react-toastify";

export default function EmailNotificationform({ setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { users, fetchUsers } = useDropDownStore();
  const { addEmailNotifications } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let filter = {};
    filter.limit = "full";
    fetchUsers(filter);
  }, []);
  const option =
    users && Array.isArray(users)
      ? [
          { value: "*", label: "All" },
          ...users.map((user) => ({
            value: user._id,
            label: `${user.name.first_name} ${user.name.middle_name} ${user.name.last_name}`,
          })),
        ]
      : [];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      let userIds = data.to.map((user) => user.value);

      if (userIds.includes("*")) {
        userIds.forEach((id) => {
          formData.append("to", "*");
        });
      } else {
        userIds.forEach((id) => {
          formData.append("to", id);
        });
      }
      formData.append("subject", data?.subject);
      formData.append("content", data?.content);
      formData.append("link_url", data?.link_url);
      // formData.append("file", data.file_url);
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
                    options={option}
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
              Upload photo or video
            </Typography>
            <Controller
              name="media_url"
              control={control}
              defaultValue=""
              // rules={{ required: "File is required" }}
              render={({ field }) => (
                <>
                  <StyledEventUpload
                    label="Upload your file"
                    onChange={(selectedFile) => {
                      field.onChange(selectedFile);
                    }}
                  />
                  {/* {errors.media_url && (
                    <span style={{ color: "red" }}>
                      {errors.media_url.message}
                    </span>
                  )} */}
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
                <>
                  <StyledInput placeholder="Paste link here" {...field} />
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton name="Cancel" variant="secondary">
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
