import React, { useState } from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import { ReactComponent as StarIcon } from "../assets/icons/StarIcon.svg";
import { ReactComponent as LocationIcon } from "../assets/icons/LocationIcon.svg";
import image from "../assets/images/Group.png";
import { StyledButton } from "./StyledButton";
import { useParams } from "react-router-dom";
import FreeSubscription from "./FreeSubscription";
import PremiumSubscription from "./PremiumSubscription";
const UserCard = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [unopen, setUnOpen] = useState(false);
  const { id } = useParams();
  const handleFree = () => {
    setOpen(true);
  };
  const handlePremium = () => {
    setUnOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUnClose = () => {
    setUnOpen(false);
  };
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
      <Grid item md={6} xs={12}>
        <img
          src={user?.profile_picture || image}
          alt="img"
          width={"216px"}
          height={"216px"}
          style={{ borderRadius: "12px" }}
        />
      </Grid>
      <Grid item md={5} xs={12} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={"10px"}>
          <Typography
            variant="h8"
            color={"rgba(44, 40, 41, 0.6)"}
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <StarIcon /> {user?.id}
          </Typography>

          <Typography variant="h5" color={"#4A4647"}>
            {user?.abbreviation} {user?.name}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {user?.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack>
              {" "}
              <PhoneIcon />
            </Stack>
            <Typography variant="h6" color={"#2C2829"}>
              {user?.mobile}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack>
              {" "}
              <EmailIcon />{" "}
            </Stack>
            <Typography variant="h6" color={"#2C2829"}>
              {user?.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <Stack>
              {" "}
              <LocationIcon />{" "}
            </Stack>
            <Typography variant="h6" color={"#2C2829"}>
              {user?.address}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid
        item
        md={1}
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
          {user?.subscription}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        {" "}
        {user?.subscription === "free" && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <StyledButton
              variant={"primary"}
              name={"Change to Premium"}
              onClick={handleFree}
            />
          </Stack>
        )}
        {user?.subscription === "premium" && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <StyledButton
              variant={"secondary"}
              name={"Change to Free"}
              onClick={handlePremium}
            />
          </Stack>
        )}
      </Grid>

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
      <FreeSubscription open={unopen} onClose={handleUnClose} id={id} />
      <PremiumSubscription open={open} onClose={handleClose} id={id} />
    </Grid>
  );
};

export default UserCard;
