import React, { useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import DropZoneforForm from "../ui/DropzoneforForm";
import { useNotificationStore } from "../store/notificationStore";

export default function InappNotificationform() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const { addAppNotifications } = useNotificationStore();
  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const onSubmit = async (data) => {
    // let imageUrl = "";
  
    // if (imageFile) {
    //   try {
    //     imageUrl = await uploadFile(imageFile);
    //   } catch (error) {
    //     console.error("Failed to upload image:", error);
    //     return;
    //   }
    // }
  
    const formData = {
      to: data?.to.value,
      subject: data?.subject,
      content: data?.content,
      link_url: data?.link_url,
      media_url: imageUrl ? imageUrl : "",
    };
  
    await addAppNotifications(formData);
    reset(); // Optionally reset the form after submission
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
              defaultValue=""
              rules={{ required: "Member is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select member"
                    options={option}
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
              rules={{ required: "File is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload your file"
                    onChange={onChange}
                  />
                  {errors.media_url && (
                    <span style={{ color: "red" }}>
                      {errors.media_url.message}
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
              Add Link
            </Typography>
            <Controller
              name="link_url"
              control={control}
              defaultValue=""
              rules={{ required: "Link is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Paste link here" {...field} />
                  {errors.link_url && (
                    <span style={{ color: "red" }}>
                      {errors.link_url.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
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
