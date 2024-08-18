import React, { useState } from "react";
import { Typography, Stack, Grid, Box, Divider } from "@mui/material";
import { StyledButton } from "./StyledButton";
import RenewForm from "../components/Members/RenewForm";

export default function AppSubscriptionCard() {
  const [renew, setRenew] = useState(false);
  const handleRenew = () => {
    setRenew(true);
  };
  const handleCloseRenew = () => {
    setRenew(false);
  };
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"20px"}
    >
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography variant="h5" color={"#686465"} marginBottom={2}>
            App Subscription
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12}>
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Plan
          </Typography>
          <Typography
            variant="h6"
            color="#EB5860"
            sx={{
              padding: "0px 6px",
              borderRadius: "12px",
              border: "1px solid #EB5860",
            }}
          >
            premium
          </Typography>
        </Stack>
        <Divider />
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Last Renewed date
          </Typography>
          <Typography variant="h6" color="#2C2829">
            12th July 2025
          </Typography>
        </Stack>
        <Divider />{" "}
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Amount paid
          </Typography>
          <Typography variant="h6" color="#2C2829">
            ₹2000
          </Typography>
        </Stack>
        <Divider />
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Expiry date
          </Typography>
          <Typography variant="h6" color="#2C2829">
            12th July 2026
          </Typography>
        </Stack>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={7}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <StyledButton name="Change Subscription" variant="third"onClick={handleRenew} />
              <StyledButton name="Renew" variant="primary"onClick={handleRenew} />
            </Stack>
            <RenewForm open={renew} onClose={handleCloseRenew} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
