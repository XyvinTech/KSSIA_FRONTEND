import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { useNewsStore } from "../store/newsStore";
import { useNavigate, useParams } from "react-router-dom";

export default function NewsAddnewform({ isUpdate, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
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

  useEffect(() => {
    if (isUpdate && id) {
      fetchNewsById(id);
    }
  }, [id, isUpdate, fetchNewsById]);
  const handleClear = (event) => {
    event.preventDefault();
    navigate("/news");
  };
  useEffect(() => {
    if (singleNews && isUpdate) {
      setValue("category", { value: singleNews.category, label: singleNews.category });
      setValue("title", singleNews.title);
      setValue("content", singleNews.content);
      setValue("image",singleNews.image);
    }
  }, [singleNews, isUpdate, setValue]);

  const option = [
    { value: "Business", label: "Business" },
    { value: "Market", label: "Market" },
    { value: "Economy", label: "Economy" },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category", data.category.value);
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (!isUpdate || (isUpdate && data.file instanceof File)) {
      formData.append("image", data.image);
    }

    if (isUpdate && id) {
      await updateNews(id, formData);
      navigate(`/news`);
    } else {
      await addNewses(formData);
      setSelectedTab(0);
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
                    placeholder="Latest"
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
              Upload Photo or video
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "File is required" }}
              render={({ field }) => (
                <>
                  <StyledEventUpload
                    label="Upload image here"
                    {...field}
                    onChange={(selectedFile) => {
                      field.onChange(selectedFile);
                    }}
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
                onClick={(event) => handleClear(event)}
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
    </Box>
  );
}
