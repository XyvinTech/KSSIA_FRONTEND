import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import { ReactComponent as EmailIcon } from "../../assets/icons/CalendarIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/StarIcon.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/LocationIcon.svg";
import moment from "moment";

const EventCard = ({ user }) => {
  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      minHeight={"220px"}
      position="relative"
    >
      <Grid item md={6} xs={12} justifyContent={"center"} alignItems={"center"}>
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
            {user?.status} Event
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
            {user?.type}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {formatDate(user?.startDate)}-{formatDate(user?.endDate)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <LocationIcon />
            {user?.type === "online" ? (
              <Typography variant="h6" color={"#2C2829"}>
                {user?.platform}
              </Typography>
            ) : (
              <Typography variant="h6" color={"#2C2829"}>
                {user?.venue}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default EventCard;
