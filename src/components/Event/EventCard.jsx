import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import { ReactComponent as EmailIcon } from "../../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/StarIcon.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/LocationIcon.svg";

const EventCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      minHeight={"220px"}
      position="relative"
    >
      <Grid item md={4} xs={12} justifyContent={"center"} alignItems={"center"}>
        <img
          src={user?.image}
          alt="img"
          width={"192px"}
          height={"200px"}
          style={{ borderRadius: "12px" }}
        />
      </Grid>

      <Grid item md={6} xs={12} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={"10px"}>
          <Typography variant="h7" color={"#EB5860"}>
            Upcoming Event
          </Typography>

          <Typography
            variant="h7"
            color="#2E7D32"
            sx={{
              padding: "0px 6px",
              borderRadius: "12px",
              border: "1px solid #2E7D32",
              width: "fit-content",
            }}
          >
            offline
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.date}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <LocationIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.address}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default EventCard;
