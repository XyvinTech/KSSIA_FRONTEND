import React, { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff, Phone } from '@mui/icons-material';
import kssiaImage from '../../../assets/images/kssia.png';
import { StyledButton } from '../../../ui/StyledButton';

const SignIn = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
   
    setError(true); 
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4} >
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Stack spacing={3} justifyContent="center" alignItems={'center'} >
          <img src={kssiaImage} alt="KSSIA" width={"133px"} height="36px" />
          </Stack>
          <Grid marginTop={2} marginBottom={2} padding={2}>
            <Typography variant="h5" align="center">
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Login to your account to continue the process
            </Typography>
            </Grid>
            <Stack>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Enter your Phone Number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  type={showOTP ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowOTP(!showOTP)} edge="end">
                          {showOTP ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography color="error" variant="body2">
                    Username or OTP is incorrect
                  </Typography>
                )}
               <StyledButton name="Sign in" variant="primary" >
              
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