import React from "react";
import { Typography, Stack, Grid, Box, Divider } from "@mui/material";
import { StyledButton } from "./StyledButton";

export default function AppSubscriptionCard() {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"16px"}
      padding={"20px"}
    >
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography variant="h5" color={"#686465"} marginBottom={2}>
            App Subscription
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6} >
        <Stack spacing={2}>
          <Typography variant="h6" color={"#686465"}>
            Plan
          </Typography>
        
          <Typography variant="h6" color={"#686465"}>
            Last Renewed date
          </Typography>
          <Typography variant="h6" color={"#686465"}>
            Amount paid
          </Typography>
          <Typography variant="h6" color={"#686465"}>
            Expiry date
          </Typography>
        </Stack>
      </Grid>
      <Grid item md={6} textAlign={"right"}>
        <Stack spacing={2} >
          <Box spacing={2} alignItems={"right"} >
          <span
            style={{
              border: "2px solid #FF9500",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "13px",
              color: "#FF9500",
              textAlign: "right", 
              display: "inline-block",
              width: "fit-content"
             
            }}
          >
            Premium
          </span>
          </Box>

          <Typography>12th July 2025</Typography>
          <Typography>Rs.2000</Typography>
          <Typography>12th July 2026</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={7}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <StyledButton name="Change Subscription" variant="third" />
              <StyledButton name="Renew" variant="primary" />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}