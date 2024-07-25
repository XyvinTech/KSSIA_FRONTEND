import React from 'react';
import { Grid, Stack, Typography, Box } from '@mui/material';
import DashboardCard from '../ui/DashboardCard';
import { LineChart } from '@mui/x-charts/LineChart';

export default function DashboardMembers() {
  const totalMembers = '30';
  const premiumAppUsers = '30';
  const freeAppUsers = '30';

  const chartData = [
    { month: 'Jan', Premium: 4000, Free: 3000 },
    { month: 'Feb', Premium: 3000, Free: 3500 },
    { month: 'Mar', Premium: 5000, Free: 4000 },
    { month: 'Apr', Premium: 4500, Free: 4800 },
    { month: 'May', Premium: 6000, Free: 5200 },
    { month: 'Jun', Premium: 5500, Free: 5700 },
    { month: 'Jul', Premium: 7000, Free: 6500 },
  ];

  return (
    <>
      <Typography
        variant="h6"
        color={'#686465'}
        fontWeight={400}
        sx={{ padding: '0 0 16px 0', fontSize: 16 }}
      >
        Members
      </Typography>
      
      <Grid container spacing={2} item xs={12}> 
      <Grid item xs={6}>
  <Box
    bgcolor={'#E4EDF7'}
    display="flex"
    justifyContent="start"
    alignItems="flex-start"
    height="100%" 
  >
    <DashboardCard
     data={{
              title: "Total Members",
              value: totalMembers,
              bgcolor: "#E4EDF7",
              color: "#4A4647"
            }}
    />
  </Box>
</Grid>
    
        <Grid item xs={6} md={6}>
          <Stack direction="column" spacing={2}>
            <DashboardCard
              data={{
                title: "Premium App Users",
                value: premiumAppUsers,
                bgcolor: "#FFFFFF",
                color: "#4A4647"
              }}
            />
            <DashboardCard
              data={{
                title: "Free App Users",
                value: freeAppUsers,
                bgcolor: "#FFFFFF",
                color: "#4A4647"
              }}
            />
          </Stack>
        </Grid>
        
        {/* Chart */}
        <Grid item xs={12}>
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      height: '400px',
      padding: '20px',
      // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      marginTop: '16px'
    }}
  >
    <LineChart
      xAxis={[{ 
        data: chartData.map(item => item.month),
        scaleType: 'point'
      }]}
      series={[
        {
          data: chartData.map(item => item.Premium),
          label: 'Premium',
          color: '#B0E102',
          curve: 'linear',
        },
        {
          data: chartData.map(item => item.Free),
          label: 'Free',
          color: '#B37F43',
          curve: 'linear',
        }
      ]}
      height={350}
      margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
      yAxis={[{ min: 0 }]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'top', horizontal: 'middle' },
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          itemMarkWidth: 10,
          itemMarkHeight: 10,
          markGap: 5,
          itemGap: 30,  
          labelStyle: {
            fontSize: 14,
            fill: '#686465',
          },
        },
      }}
    />
  </Box>
</Grid>
      </Grid>
    </>
  );
}