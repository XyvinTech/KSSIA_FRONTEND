import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import { Grid, Typography, Stack } from '@mui/material';

export default function DashboardEvents() {
  const eventsData = [
    { title: 'Total Events', value: '30', bgcolor: '#E4EDF7', color: '#2C2829' },
    { title: 'Upcoming Events', value: '30', bgcolor: '#FFFFFF', color: '#34C759' },
    { title: 'Ongoing Events', value: '30', bgcolor: '#FFFFFF', color: '#686465' },
    { title: 'Completed Events', value: '30', bgcolor: '#FFFFFF', color: '#004797' },
    { title: 'Cancelled Events', value: '02', bgcolor: '#FFFFFF', color: '#EB5860' },
  ];

  return (
    <>
    <Grid container item xs={12}>
      <Typography 
        variant="h6" 
        color={'#686465'} 
        fontWeight={400} 
        sx={{ padding: '0 0 16px 0', fontSize: 16 }}
      >
        Events
      </Typography>
      
      <Grid container spacing={2}>
        {eventsData.map((data, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <DashboardCard data={data} />
          </Grid>
        ))}
      </Grid>
      </Grid>
    </>
  );
}