import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import { Grid, Typography, Stack } from '@mui/material';
import Review from './Review';

export default function MemberAnalytics() {
  const eventsData = [
    { title: 'Total Products', value: '23', bgcolor: '#FFFFFF', color: '#34C759' },
    { title: 'Profile Shares', value: '10', bgcolor: '#FFFFFF', color: '#686465' },
    { title: 'Requirements Posted ', value: '05', bgcolor: '#FFFFFF', color: '#686465' },
    
  ];

  return (
    <>
    <Grid container item xs={12}>
      
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