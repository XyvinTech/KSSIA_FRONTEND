import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import img from "../../assets/images/Zydex.png";
const OrganizerCard = ({data}) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}display={'flex'} 
      minHeight={"220px"}
      position="relative"
    >
      <Stack justifyContent={'center'} spacing={2}>
        <Typography variant="h7" color={"#2C2829"}>
        {data?.organiser_name}
        </Typography>
        <Typography variant="h6" color={"#2C2829"}>
        {data?.organiser_company_name}
        </Typography>
        <Typography variant="h7" color={"#2C2829"}>
          Description
        </Typography>
        <Typography variant="h7" color={"#2C2829"}>
        {data?.description}
        </Typography>
      </Stack>{" "}
    </Grid>
  );
};

export default OrganizerCard;
