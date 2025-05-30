import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
} from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { useNewsStore } from "../store/newsStore";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import uploadFileToS3 from "../utils/s3Upload";
import StyledCrop from "../ui/StyledCrop";
import { StyledEventUpload } from "../ui/StyledEventUpload";
import { set } from "date-fns";
import { upload } from "../api/admin-api";

export default function NewsAddnewform({ isUpdate, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      category: null,
      title: "",
      image: "",
      content: "",
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { singleNews, fetchNewsById, addNewses, updateNews } = useNewsStore();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  useEffect(() => {
    if (isUpdate && id) {
      fetchNewsById(id);
    }
  }, [id, isUpdate, fetchNewsById]);

  useEffect(() => {
    if (singleNews && isUpdate) {
      setValue("category", {
        value: singleNews.category,
        label: singleNews.category,
      });
      setValue("title", singleNews.title);
      setValue("content", singleNews.content);
      setValue("image", singleNews.image);
      if (singleNews.image) setImagePreview(singleNews.image);
      setValue("pdf", singleNews.pdf);
      if (singleNews.pdf) {
        setPdfPreview(singleNews.pdf);
      } else {
        setPdfPreview(null);
      }
    }
  }, [singleNews, isUpdate, setValue, pdfPreview]);

  const option = [
    { value: "Business", label: "Business" },
    { value: "Market", label: "Market" },
    { value: "Economy", label: "Economy" },
  ];

  const onSubmit = async (data) => {
    let imageUrl = data?.image || "";
    let pdfUrl = data?.pdf || "";
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
    if (pdfFile) {
      try {
        pdfUrl = await new Promise(async (resolve, reject) => {
          try {
            const response = await upload(pdfFile);
            resolve(response?.data || "");
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        console.error("Failed to upload pdf:", error);
        return;
      }
    }

    const formData = {
      image: imageUrl,
      category: data.category.value,
      title: data.title,
      content: data.content,
      ...(pdfUrl && { pdf: pdfUrl }),
    };

    if (isUpdate && id) {
      await updateNews(id, formData);
      navigate(`/news`);
    } else {
      await addNewses(formData);
      setSelectedTab(0);
    }
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const handleImageChange = (selectedFile) => {
    setImageFile(selectedFile);
    setValue("image", selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    }
  };

  const handlePDFChange = (selectedFile) => {
    setPdfFile(selectedFile);
    setValue("pdf", selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPdfPreview(previewURL);
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
              Choose category
            </Typography>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Category"
                    options={option}
                    {...field}
                  />
                  {errors.category && (
                    <span style={{ color: "red" }}>
                      {errors.category.message}
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
              Title
            </Typography>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the news title" {...field} />
                  {errors.title && (
                    <span style={{ color: "red" }}>{errors.title.message}</span>
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
              Upload Photo
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "File is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledCrop
                    label="Upload image here"
                    onChange={(selectedFile) => {
                      handleImageChange(selectedFile);
                      onChange(selectedFile);
                    }}
                    ratio={16 / 9}
                    value={value}
                  />
                  {errors.image && (
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
              Upload Document
            </Typography>
            <Controller
              name="pdf"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledCrop
                    label="Upload PDF here"
                    onChange={(selectedFile) => {
                      handlePDFChange(selectedFile);
                      onChange(selectedFile); // Pass file to react-hook-form
                    }}
                    value={value}
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
              Add content
            </Typography>
            <Controller
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Description in less than 500 words"
                    {...field}
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
          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Preview"
                variant="secondary"
                onClick={(event) => {
                  event.preventDefault();
                  handlePreviewOpen();
                }}
              >
                Preview
              </StyledButton>
              <StyledButton
                name={isUpdate ? "Update" : "Publish"}
                variant="primary"
                type="submit"
                style={{ width: "auto" }}
              >
                Publish
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="sm"
        fullWidth
      >
        {" "}
        <Stack direction={"row"} justifyContent={"end"} padding={2}>
          <Typography
            onClick={handlePreviewClose}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Stack>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold">
            Category:
          </Typography>
          <Typography>{getValues("category")?.label || "N/A"}</Typography>

          <Typography variant="h6" fontWeight="bold" mt={2}>
            Title:
          </Typography>
          <Typography>{getValues("title") || "N/A"}</Typography>

          <Typography variant="h6" fontWeight="bold" mt={2}>
            Content:
          </Typography>
          <Typography>{getValues("content") || "N/A"}</Typography>

          <Typography variant="h6" fontWeight="bold" mt={2}>
            Image:
          </Typography>
          {imagePreview ? (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{ width: "100%", borderRadius: 2, mt: 1 }}
            />
          ) : (
            <Typography>No image selected</Typography>
          )}

          <Typography variant="h6" fontWeight="bold" mt={2}>
            PDF File:
          </Typography>
          {pdfPreview ? (
            <Box sx={{ mt: 1 }}>
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  pdfPreview
                )}&embedded=true`}
                title="PDF Preview"
                width="100%"
                height="500px"
                style={{ borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </Box>
          ) : (
            <Typography>No PDF uploaded</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
