import React from "react";
import { Grid, Stack, Typography, Box, Chip } from "@mui/material";
import officer from "../assets/images/officer.png";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import { ReactComponent as LocationIcon } from "../assets/icons/LocationIcon.svg";
import { ReactComponent as BusinessIcon } from "../assets/icons/BusinessWhatsappIcon.svg";
import { ReactComponent as WhatsappIcon } from "../assets/icons/WhatsappIcon.svg";
const UserCard2 = ({company}) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"9px"}
      minHeight={'420px'}
    >
      <Grid item xs={12} display="flex" alignItems="center">
        <img
          src={officer}
          alt="img"
          width={"50px"}
          height={"50px"}
          style={{ borderRadius: "12px", marginRight: "16px" }} // Add margin to the right of the image
        />
        <Box>
          <Typography variant="h4" color="#000000" mt={1}>
            {company.designation}
          </Typography>
          <Typography variant="h6" color="#000000" mt={1}>
            {company.company_name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={"14px"}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h6" color={"#2C2829"}>
              Bussiness category
            </Typography>
            <Typography
              variant="h7"
              color="#0288D1"
              sx={{
                padding: "0px 6px",
                borderRadius: "12px",
                border: "1px solid #0288D1",
              }}
            >
              {company.business_category}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
            paddingBottom={2}
          >
            <Typography variant="h6" color={"#2C2829"}>
              Sub category
            </Typography>
            <Typography
              variant="h7"
              color="#9C27B0"
              sx={{
                padding: "0px 6px",
                borderRadius: "12px",
                border: "1px solid #9C27B0",
              }}
            >
              {company.sub_category}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {company.phone_numbers?.personal}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BusinessIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {company.phone_numbers?.landline}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <WhatsappIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {company.company_phone_number?.watsapp}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {company.company_email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <LocationIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {company.bio}
            </Typography>
          </Stack>{" "}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserCard2;
