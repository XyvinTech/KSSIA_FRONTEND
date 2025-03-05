import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Phone } from "@mui/icons-material";
import kssiaImage from "../../../assets/images/logo-demo.png";
import { StyledButton } from "../../../ui/StyledButton";
import TextField from "@mui/material/TextField";
import { ReactComponent as Lock } from "../../../assets/icons/Lock.svg";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../../api/admin-api";
import { Controller, useForm } from "react-hook-form";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showOTP, setShowOTP] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        email: data.phone,
        password: data.otp,
      };
      const user = await getLogin(formData);
      localStorage.setItem("token", user.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(true);
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ p: 4, bgcolor: "#FFFFFF", borderRadius: 5, boxShadow: 2 }}>
          <Stack spacing={3} justifyContent="center" alignItems={"center"}>
            <img src={kssiaImage} alt="KSSIA" width={"150px"} height="100px" />
          </Stack>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ marginTop: 8, marginBottom: 5 }}
          >
            <Typography variant="h5" align="left">
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              Login to your account to continue the process
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Enter your Email"
                      variant="outlined"
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="action" />
                          </InputAdornment>
                        ),
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#888888",
                          "&.Mui-focused": {
                            color: "#000000",
                          },
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="otp"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Enter Password"
                      variant="outlined"
                      type={showOTP ? "password" : "text"}
                      error={!!errors.otp}
                      helperText={errors.otp ? errors.otp.message : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowOTP(!showOTP)}
                              edge="end"
                            >
                              {showOTP ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#888888",
                          "&.Mui-focused": {
                            color: "#000000",
                          },
                        },
                      }}
                    />
                  )}
                />
                {error && (
                  <Typography color="error" variant="body2">
                    Username or Password is incorrect
                  </Typography>
                )}
                <StyledButton name={loading ?   <CircularProgress size={24} />: "Sign in" } variant="primary">
                  SignIn
                </StyledButton>
              </Stack>
            </form>
          </Stack>
          <Grid marginTop={2}>
            <Link href="#" variant="body2" align="center">
              Forgot Your Password?
            </Link>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
