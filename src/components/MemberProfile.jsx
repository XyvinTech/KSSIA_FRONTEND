import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import imag from "../assets/images/staff.png";
import UserCard from "../ui/Usercard";
import UserCard2 from "../ui/Usercard2";

const MemberProfile = ({data}) => {
  
  // const data = {
  //   id: "4.5",
  //   name: "Prabodhan Fitzgerald",
  //   title: "Member ID: KSSIA-GM-0934",
  //   phone: "+1234567890",
  //   email: "john.doe@example.com",
  //   address:"123,cross ,Lorel ipsumLorel ipsum,567788",
  //   img: imag,
  // };

 
  return (
    <>
      
      <Grid container spacing={4} padding={4}>
      <Grid item md={5}>
        <UserCard user={data} />
      </Grid>
      <Grid item md={6}>
        <UserCard2 />
      </Grid>
    </Grid>

     
    </>
  );
};

export default MemberProfile;
