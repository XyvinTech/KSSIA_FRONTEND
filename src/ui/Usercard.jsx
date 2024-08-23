import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import { ReactComponent as StarIcon } from "../assets/icons/StarIcon.svg";
import { ReactComponent as LocationIcon } from "../assets/icons/LocationIcon.svg";

const UserCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}
      minHeight={"420px"}
      position="relative"
    >
      <Box
        position="absolute"
        top={10}
        right={10}
        bgcolor="orange"
        borderRadius="20px"
        padding="2px 8px"
        display="flex"
        alignItems="center"
      >
        <Typography variant="caption" color="white" fontWeight="bold">
          Premium
        </Typography>
      </Box>

      {user?.img ? (
        <Grid
          item
          md={4}
          xs={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src={user?.img}
            alt="img"
            width={"118px"}
            height={"118px"}
            style={{ borderRadius: "12px" }}
          />
        </Grid>
      ) : null}
      <Grid item md={8} xs={6}>
        <Stack spacing={"10px"}>
          <Typography
            variant="h8"
            color={"rgba(44, 40, 41, 0.6)"}
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <StarIcon />
          </Typography>
          <Typography variant="h5" color={"#4A4647"}>
            {user?.full_name}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            Member ID: {user?.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.phone_numbers?.personal}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.email}
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
      {/* <Grid
        item
        md={2}
        xs={12}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
      >
        <Typography
          variant="h7"
          color="white"
          fontWeight="bold"
          sx={{
            backgroundColor: "orange",
            padding: "0px 6px",
            borderRadius: "12px",
          }}
        >
          Premium
        </Typography>
      </Grid> */}
      <Grid
        item
        md={12}
        xs={12}
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
      >
        <Typography variant="h7" color={"#626262"} fontWeight={700}>
          Bio
        </Typography>
        <Typography variant="h6" color={"#626262"}>
        {user?.bio}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserCard;
