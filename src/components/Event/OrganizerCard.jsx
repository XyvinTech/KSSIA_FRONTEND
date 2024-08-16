import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import img from "../../assets/images/Zydex.png";
const OrganizerCard = () => {
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
          Organiser
        </Typography>
        <img src={img} width={"113px"} height={"24px"} />
        <Typography variant="h7" color={"#2C2829"}>
          Description
        </Typography>
        <Typography variant="h7" color={"#2C2829"}>
          Lorem ipsum dolor sit amet consectetur. Ut vitae amet congue augue
          rhoncus eget vel quis ornare. Nullam erat eget tristique imperdiet.
          Malesuada vestibulum pretium at adipiscing platea egestas varius. Nibh
          euismod ultrices dui ultricies ultricies .
        </Typography>
      </Stack>{" "}
    </Grid>
  );
};

export default OrganizerCard;
