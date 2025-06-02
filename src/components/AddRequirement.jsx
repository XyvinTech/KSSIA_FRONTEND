import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, Skeleton } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { useLocation, useNavigate } from "react-router-dom";
import { useDropDownStore } from "../store/dropDownStore";
import { toast } from "react-toastify";
import { upload } from "../api/admin-api";
import useRequirementStore from "../store/requirementStore";

export default function AddRequirement() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { createRequirement } = useRequirementStore();
  const [loading, setLoading] = useState(false);
  const { users, fetchUsers } = useDropDownStore();
  const location = useLocation();
  const { userId } = location.state || {};
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    let filter = {};
    filter.limit = "full";
    fetchUsers(filter);
  }, []);
  useEffect(() => {
    if (userId) {
      const defaultSeller = users.find((user) => user?._id === userId);
      if (defaultSeller) {
        setValue("author", {
          value: defaultSeller._id,
          label: `${defaultSeller.abbreviation} ${defaultSeller.name}`,
        });
      }
    }
  }, [setValue, users, userId]);
  const option =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user._id,
          label: `${user?.abbreviation} ${user?.name} `,
        }))
      : [];

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.image || "";

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
      const formData = {
        author: data?.author.value,
        content: data?.content,
        ...(imageUrl && { image: imageUrl }),
        status: "pending",
      };

      await createRequirement(formData);

      navigate(`/members/member/${userId}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <>
        <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Author
                </Typography>
                <Controller
                  name="author"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Enter Seller name"
                        options={option}
                        {...field}
                      />
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
                  Image
                </Typography>
                <Controller
                  name="image"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <>
                      <StyledEventUpload
                        label="Upload Product Image"
                        onChange={(file) => {
                          setImageFile(file);
                          onChange(file);
                        }}
                        value={value}
                      />
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
                  Content
                </Typography>
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        placeholder="Add content in less than 500 words"
                        {...field}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                {" "}
                <Stack direction={"row"} spacing={2}>
                  <StyledButton
                    name="Cancel"
                    variant="secondary"
                    disabled={loading}
                    onClick={(event) => handleClear(event)}
                    style={{ width: "auto" }}
                  />
                  <StyledButton
                    name={loading ? "Saving..." : "Save"}
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  />
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      </>
    </>
  );
}
