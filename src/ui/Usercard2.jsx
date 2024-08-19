import React from "react";
import { Grid, Stack, Typography, Box, Chip } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import staffImage from "../assets/images/staff.png";

const UserCard2 = ({data}) => {
  
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"9px"}
      minHeight={"160px"}
      position="relative"
      direction="row"
    >
      <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={staffImage}
            alt="Fitzer Textiles"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography variant="h6" color="#000000" mt={1}>
          {data.company_name}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={1} sx={{ flexGrow: 1, overflow: 'hidden', alignItems: 'flex-end' }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="#666666">
                Designation
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="#000000" noWrap>
                {data.designation}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="#666666">
                Business category
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Chip 
                label={data.business_category} 
                size="small" 
                variant="outlined" 
                sx={{ 
                  borderRadius: '16px',
                  borderColor: '#0288D1',
                  color: '#0288D1'
                }} 
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="#666666">
                Sub category
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Chip 
                label={data.sub_category} 
                size="small" 
                variant="outlined" 
                sx={{ 
                  borderRadius: '16px',
                  borderColor: '#0288D1',
                  color: '#0288D1'
                }} 
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="#666666">
                Company Phone
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5}>
                <Typography variant="body2" color="#000000" noWrap>
                  {data.company_phone_number}
                </Typography>
                <Box sx={{ minWidth: '24px' }}>
                  <PhoneIcon />
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="#666666">
                Company Email
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5}>
                <Typography variant="body2" color="#000000" noWrap>
                  {data.company_email}
                </Typography>
                <Box sx={{ minWidth: '24px' }}>
                  <EmailIcon />
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="#666666">
                Company Address
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={0.5}>
                <Typography variant="body2" color="#000000">
                  {data.address}
                </Typography>
                <Box sx={{ minWidth: '40px' }}>
                  <PhoneIcon />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserCard2;
