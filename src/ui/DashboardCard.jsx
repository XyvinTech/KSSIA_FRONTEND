import { Stack, Typography } from "@mui/material";
import React from "react";

const DashboardCard = ({ data }) => {
  return (
    <Stack
      bgcolor={data?.bgcolor}height={'120px'}padding={2}
      borderRadius={'12px'} 
      sx={{
        justifyContent: 'start' 
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 700,

          textAlign: 'left',
          color: '#828282'
        }}
      >
        {data?.title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: '43.54px',
          fontWeight: 900,
          textAlign: 'left',
          color: data?.color
        }}
      >
        {data?.value}
      </Typography>
    </Stack>
  );
};

export default DashboardCard;
