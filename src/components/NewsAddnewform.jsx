import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { useNewsStore } from "../store/newsStore";
import { useParams } from "react-router-dom";

export default function NewsAddnewform({ isUpdate }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams();
  const { news, fetchNewsById, addNewses, updateNews } = useNewsStore();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isUpdate && id) {
      fetchNewsById(id).then(() => {
        setValue("category", { value: news.category, label: news.category });

        setValue("title", news.title);
        setValue("image", news.image);
        setValue("content", news.content);
      });
    }
  }, [id, isUpdate, news, setValue]);
  const option = [
    { value: "businesses", label: "businesses" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const onSubmit = async (data) => {
    // try {
    //   let imageUrl = data.image; // Default to current image URL if any

    //   if (file) {
    //     imageUrl = await uploadFile(file); // Upload file and get URL
    //   }

      const formData = {
        category: data?.category.value,
        title: data?.title,
        content: data?.content,
        image: imageUrl, // Use the uploaded file URL
      };

      if (isUpdate && id) {
        updateNews(id, formData);
      } else {
        addNewses(formData);
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
              rules={{ required: "Category  is required" }}
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
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload image here"
                    onChange={(file) => {
                      setFile(file); // Set file state
                      onChange(file); // Pass to react-hook-form
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
          <Grid item xs={6}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Preview"
                variant="secondary"
                style={{ width: "auto" }}
              >
                Preview
              </StyledButton>
              <StyledButton
                name="Publish"
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
