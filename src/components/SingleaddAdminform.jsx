import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledButton } from "../ui/StyledButton";

import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { useDropDownStore } from "../store/dropDownStore.js";
import { useAdminStore } from "../store/adminStore.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function SingleaddAdminform() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { fetchRoles, roles } = useDropDownStore();
  const { adminId, isUpdate } = location.state || {};
  const { addAdmin, fetchSingleAdmin, admin, updateAdmin } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRoles();
  }, []);
  useEffect(() => {
    if (isUpdate && adminId) {
      fetchSingleAdmin(adminId);
    }
  }, [adminId, isUpdate]);
  useEffect(() => {
    if (admin && isUpdate) {
      setValue("name", admin.name);
      setValue("email", admin.email);
      const role = roles.find((r) => r?._id === admin.role);
      if (role) {
        setValue("role", {
          value: role._id,
          label: role.roleName,
        });
      }
    }
  }, [admin, isUpdate, setValue]);
  const option =
    roles && Array.isArray(roles)
      ? roles.map((r) => ({
          value: r._id,
          label: r.roleName,
        }))
      : [];
      const handleClear=(event)=>{
        event.preventDefault();
        reset();
        navigate(-1)
      
      }
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data.name,
        role: data.role.value,
        email: data.email,
        password: "string@123",
      };
      if (isUpdate && adminId) {
        await updateAdmin(adminId, formData);
      } else {
        await addAdmin(formData);
      }
      navigate("/settings");
      reset();
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
              Name of the Person
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter person name" {...field} />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
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
              Role
            </Typography>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select role"
                    options={option}
                    {...field}
                  />
                  {errors.role && (
                    <span style={{ color: "red" }}>{errors.role.message}</span>
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
              Email ID
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the email ID" {...field} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Cancel"
                variant="secondary"onClick={(event) => handleClear(event)}
                style={{ width: "auto" }}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name={loading ? "Saving..." : "Save"}
                variant="primary"
                type="submit"
                style={{ width: "auto" }}
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
