import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Dialog,
  DialogContent,
  FormHelperText,
} from "@mui/material";
import { StyledButton } from "../ui/StyledButton.jsx";
import { StyledCalender } from "../ui/StyledCalender.jsx";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField.jsx";
import StyledInput from "../ui/StyledInput.jsx";
import { usePromotionStore } from "../store/promotionStore.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField .jsx";
import uploadFileToS3 from "../utils/s3Upload.js";
import StyledCrop from "../ui/StyledCrop.jsx";
import { upload } from "../api/admin-api.js";

export default function PromotionForm({ isUpdate }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { value } = location.state || {};

  const [type, setType] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { addPromotions, fetchPromotionById, promotions, updatePromotion } =
    usePromotionStore();

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|watch\?.+&v=)([^&]{11}).*/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  const getAspectRatio = () => {
    switch (type) {
      case "banner":
        return 2 / 1;
      case "poster":
        return 19 / 20;
      default:
        return 1;
    }
  };
  const handlePreviewOpen = () => {
    const data = {
      type: getValues("type")?.label,
      startDate: getValues("startDate"),
      endDate: getValues("endDate"),
      title: getValues("title"),
      description: getValues("description"),
      link: getValues("link"),
      yt_link: getValues("yt_link"),
      file: getValues("file"),
    };
    setPreviewData(data);
    setPreviewOpen(true);
  };

  const handleImageChange = (selectedFile) => {
    setImageFile(selectedFile);
    setValue("file", selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    }
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const option = [
    { value: "banner", label: "Banner" },
    { value: "video", label: "Video" },
    { value: "poster", label: "Poster" },
    { value: "notice", label: "Notice" },
  ];

  const handleClear = (event) => {
    event.preventDefault();
    navigate("/promotions");
  };

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

      if (promotions.type === "notice") {
        setValue("title", promotions.notice_title || "");
        setValue("description", promotions.notice_description || "");
        setValue("link", promotions.notice_link || "");
      } else if (promotions.type === "video") {
        setValue("title", promotions.video_title || "");
        setValue("yt_link", promotions.yt_link || "");
      } else if (promotions.type === "banner") {
        setValue(
          "file",
          promotions.banner_image_url || promotions.poster_image_url || ""
        );
      } else if (promotions.type === "poster") {
        setValue(
          "file",
          promotions.banner_image_url || promotions.poster_image_url || ""
        );
        setValue("title", promotions.poster_title);
      }

      setType(promotions.type);
    }
  }, [isUpdate, promotions, setValue]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      let imageUrl = data?.file || "";

      if (imageFile) {
        try {
          imageUrl = await new Promise(async (resolve, reject) => {
            try {
              const response = await upload(imageFile);
              resolve(response?.data || "");
            } catch (error) {
              reject(error);
            }
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return;
        }
      }

      const currentDate = moment().startOf("day");
      const endDate = moment(data?.endDate).startOf("day");
      const isStatusTrue = endDate.isAfter(currentDate);
      const formData = {
        startDate: data?.startDate,
        endDate: data?.endDate,
        status: isStatusTrue,
      };
      if (type === "notice") {
        formData.type = "notice";
        formData.notice_title = data?.title;
        formData.notice_description = data?.description;
        if (data?.link) {
          formData.notice_link = data?.link;
        }
      } else if (type === "banner") {
        formData.type = type;
        formData.file_url = imageUrl;
      } else if (type === "video") {
        formData.type = "video";
        formData.yt_link = data?.yt_link;
        formData.video_title = data?.title;
      } else if (type === "poster") {
        formData.type = type;
        formData.file_url = imageUrl;
        formData.poster_title = data?.title;
      }
      if (isUpdate && id) {
        await updatePromotion(id, formData);
      } else {
        await addPromotions(formData);
      }
      navigate("/promotions");
    } catch (error) {
      toast.error(error.message);
    } finally {
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
          </Grid>

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
                render={({ field: { onChange, value } }) => (
                  <>
                    {" "}
                    <StyledCrop
                      label="Upload image here"
                      onChange={(file) => {
                        handleImageChange(file);
                        onChange(file);
                      }}
                      ratio={getAspectRatio()}
                      value={value}
                    />{" "}
                  </>
                )}
              />
            </Grid>
          )}

          {type === "video" && (
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Add YouTube link
              </Typography>
              <Controller
                name="yt_link"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledInput placeholder="Add YouTube link" {...field} />
                )}
              />
            </Grid>
          )}

          {(type === "video" || type === "notice" || type === "poster") && (
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
                  <StyledInput placeholder="Title" {...field} />
                )}
              />
            </Grid>
          )}

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
                    <StyledMultilineTextField
                      placeholder="Add Description (max 500 words)"
                      {...field}
                    />
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
                    <StyledInput placeholder="Link" {...field} />
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
                    label="Select start date from Calendar"
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
                    label="Select end date from Calendar"
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
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Preview"
                variant="secondary"
                disabled={submitting}
                onClick={(event) => {
                  event.preventDefault();
                  handlePreviewOpen();
                }}
              >
                Preview
              </StyledButton>
              <StyledButton
                name={submitting ? "Publishing..." : "Publish"}
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

      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Stack direction={"row"} justifyContent={"end"} paddingBottom={2}>
            <Typography
              onClick={handlePreviewClose}
              color="#E71D36"
              style={{ cursor: "pointer" }}
            >
              <CloseIcon />
            </Typography>
          </Stack>
          <Box
            sx={{
              padding: 3,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Promotion Preview
            </Typography>
            {previewData?.type && (
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Type:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {previewData?.type}
                </span>
              </Typography>
            )}

            {previewData?.startDate && (
              <Typography variant="h6" gutterBottom>
                <strong>Start Date:</strong>{" "}
                <span>
                  {moment(previewData?.startDate).format("MMMM Do YYYY")}
                </span>
              </Typography>
            )}

            {previewData?.endDate && (
              <Typography variant="h6" gutterBottom>
                <strong>End Date:</strong>{" "}
                <span>
                  {moment(previewData?.endDate).format("MMMM Do YYYY")}
                </span>
              </Typography>
            )}

            {previewData?.title && (
              <Typography variant="h6" gutterBottom>
                <strong>Title:</strong> <span>{previewData?.title}</span>
              </Typography>
            )}

            {previewData?.type === "notice" && (
              <>
                {previewData?.description && (
                  <Typography variant="h6" gutterBottom>
                    <strong>Description:</strong>{" "}
                    <span>{previewData?.description}</span>
                  </Typography>
                )}
                {previewData?.link && (
                  <Typography variant="h6" gutterBottom>
                    <strong>Link:</strong> <span>{previewData?.link}</span>
                  </Typography>
                )}
              </>
            )}

            {previewData?.yt_link && (
              <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    previewData?.yt_link
                  )}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </Box>
            )}

            <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    maxHeight: "300px",
                    borderRadius: 2,
                    boxShadow: 2,
                    objectFit: "cover",
                  }}
                />
              ) : (
                previewData?.file && (
                  <Box
                    component="img"
                    src={
                      previewData.file instanceof File
                        ? URL.createObjectURL(previewData.file)
                        : previewData.file
                    }
                    alt="Uploaded Preview"
                    sx={{
                      width: "100%",
                      maxHeight: "300px",
                      borderRadius: 2,
                      boxShadow: 2,
                      objectFit: "cover",
                    }}
                  />
                )
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
