import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';

const StyledRadio = styled(Radio)({
  '&.MuiRadio-root': {
    color: '#004797',
    padding: '8px', 
  },
  '&.Mui-checked': {
    color: '#004797',
  },
});

const StyledSelectAccess = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} item xs={12}  border={1} borderColor={'#ced4da'}  >
        <Grid item xs={6} sm={6}marginBottom={2}>
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>Permissions</Typography>
            <Typography variant='h6'>Dashboard</Typography>
            <Typography variant='h6'>Members</Typography>
            <Typography variant='h6'>Products</Typography>
            <Typography variant='h6'>Events</Typography>
            <Typography variant='h6'>Payments</Typography>
            <Typography variant='h6'>Promotions</Typography>
            <Typography variant='h6'>Notifications</Typography>
            <Typography variant='h6'>News and Updates</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3} justifyContent={'flex-end'}>
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>View</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="view"
                name="controlled-radio-buttons-group"
              >
                {['dashboard', 'members', 'products', 'events', 'payments', 'promotions', 'notifications', 'news'].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<StyledRadio size="small" />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={3} justifyContent={'flex-end'}>
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>Modify</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="modify"
                name="controlled-radio-buttons-group"
              >
                {['dashboard', 'members', 'products', 'events', 'payments', 'promotions', 'notifications', 'news'].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<StyledRadio size="small" />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StyledSelectAccess;