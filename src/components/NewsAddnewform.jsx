import React, { useState } from "react";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";

export default function NewsAddnewform() {
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
              Choose category
            </Typography>
            <Controller
              name="category"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
              name="file"
              control={control}
              defaultValue=""
              rules={{ required: "file is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload your file"
                    onChange={onChange}
                  />
                  {errors.file && (
                    <span style={{ color: "red" }}>{errors.file.message}</span>
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
              name="desc"
              control={control}
              defaultValue=""
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Description in less than 500 words"
                    {...field}
                  />
                  {errors.desc && (
                    <span style={{ color: "red" }}>{errors.desc.message}</span>
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
