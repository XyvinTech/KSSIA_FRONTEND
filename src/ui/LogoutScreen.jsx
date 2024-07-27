import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Stack,
  Divider
} from '@mui/material';
import { StyledButton } from './StyledButton';


const LogoutScreen = ({ onCancel, onLogout }) => {
  return (
    
    <Grid
    container
    item
    xs={12}
    justifyContent="center"
    alignItems="center"
    bgcolor={'white'}
    padding={5}
    borderRadius={'12px'}
  >
    <Grid item xs={12} sm={6} md={4}>
      <Stack
        direction={'column'}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Are you sure?
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center"
          noWrap  // This ensures the text stays on a single line
         
        >
          You will be logged out
        </Typography>
        <Divider sx={{ width: '100%', my: 2 }} /> 
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
          }}
        >
          <StyledButton name="cancel" variant="secondary">
            Cancel
          </StyledButton>
          <StyledButton name="Logout" variant="primary">
            Logout
          </StyledButton>
        </Box>
      </Stack>
    </Grid>
  </Grid>
      
 
  );
};

export default LogoutScreen;