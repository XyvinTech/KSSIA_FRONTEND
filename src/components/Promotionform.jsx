import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton.jsx";
import { StyledCalender } from "../ui/StyledCalender.jsx";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField.jsx";
import { StyledEventUpload } from "../ui/StyledEventUpload.jsx";
import StyledInput from "../ui/StyledInput.jsx";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField .jsx";
import { usePromotionStore } from "../store/promotionStore.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Promotionform({ isUpdate }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { value } = location.state || {};

  const [type, setType] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { addPromotions, fetchPromotionById, promotions, updatePromotion } =
    usePromotionStore();
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const option = [
    { value: "banner", label: "Banner" },
    { value: "video", label: "Video" },
    { value: "poster", label: "Poster" },
    { value: "notice", label: "Notice" },
  ];
  useEffect(() => {
    if (isUpdate && id) {
      fetchPromotionById(value, id);
    }
  }, [id, isUpdate, fetchPromotionById]);
  useEffect(() => {
    if (isUpdate && promotions) {
      setValue("type", { value: promotions.type, label: promotions.type });
      setValue("startDate", promotions.startDate);
      setValue("endDate", promotions.endDate);
      setValue("title", promotions.notice_title || "");
      // setValue("title", promotions.video_title || "");
      setValue("description", promotions.notice_description || "");
      setValue("link", promotions.notice_link || "");
      setValue("yt_link", promotions.yt_link || "");
      setType(promotions.type);
    }
  }, [isUpdate, promotions, setValue]);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append("startDate", data?.startDate);
    formData.append("endDate", data?.endDate);

    if (type === "notice") {
      formData.append("type", "notice");
      formData.append("notice_title", data?.title);
      formData.append("notice_description", data?.description);
      formData.append("notice_link", data?.link);
    }

    if (type === "banner") {
      formData.append("type", "banner");
      if (data?.file) {
        formData.append("file", data?.file);
      }
    }
    if (type === "poster") {
      formData.append("type", "poster");
      if (data?.file) {
        formData.append("file", data?.file);
      }
    }

    if (type === "video") {
      formData.append("type", "video");
      formData.append("yt_link", data?.yt_link);
      formData.append("video_title", data?.title);
      if (data?.upload_video) {
        formData.append("file", data?.upload_video);
      }
    }
    if (isUpdate && id) {
      await updatePromotion(id, formData);
      navigate(`/promotions`);
    } else {
      await addPromotions(formData);
      navigate(`/promotions`);
      setSubmitting(false);
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
              Choose type
            </Typography>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select the type"
                    options={option}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTypeChange(e);
                    }}
                  />
                  {errors.type && (
                    <span style={{ color: "red" }}>{errors.type.message}</span>
                  )}
                </>
              )}
            />
          </Grid>{" "}
          {(type === "banner" || type === "poster") && (
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Upload image
              </Typography>
              <Controller
                name="file"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <StyledEventUpload
                      label="Upload image here"
                      {...field}
                      onChange={(selectedFile) => {
                        field.onChange(selectedFile);
                      }}
                    />
                  </>
                )}
              />
            </Grid>
          )}
          {type === "video" && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Upload video
                </Typography>
                <Controller
                  name="upload_video"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <>
                      <StyledEventUpload
                        label="Upload video here"
                        onChange={onChange}
                      />
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
                  Add Youtube link
                </Typography>
                <Controller
                  name="yt_link"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput placeholder="Add Youtube link" {...field} />
                    </>
                  )}
                />
              </Grid>{" "}
            </>
          )}{" "}
          {(type === "video" || type === "notice") && (
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Title
              </Typography>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <StyledInput placeholder="Title" {...field} />
                  </>
                )}
              />
            </Grid>
          )}{" "}
          {type === "notice" && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Description
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        placeholder="Add Description in less than 500 words"
                        {...field}
                      />
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
                  Link
                </Typography>
                <Controller
                  name="link"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput placeholder="Link" {...field} />
                    </>
                  )}
                />
              </Grid>
            </>
          )}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Start Date
            </Typography>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select start date from Calender"
                    {...field}
                  />
                  {errors.startDate && (
                    <span style={{ color: "red" }}>
                      {errors.startDate.message}
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
              End Date
            </Typography>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select end date from Calender"
                    {...field}
                  />
                  {errors.endDate && (
                    <span style={{ color: "red" }}>
                      {errors.endDate.message}
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
                name="Preview"
                variant="secondary"
                disabled={submitting}
              >
                Preview
              </StyledButton>
              <StyledButton
                name="Publish"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                Publish
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
