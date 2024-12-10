import React, { useState } from "react";
import { Typography, Stack, Grid, Box, Divider } from "@mui/material";
import { StyledButton } from "./StyledButton";
import RenewForm from "../components/Members/RenewForm";
import moment from "moment";
import AddSubscription from "../components/Members/AddSubscription";

export default function AppSubscriptionCard({ payment }) {
  const [renew, setRenew] = useState(false);
  const [add, setAdd] = useState(false);
  const handleRenew = () => {
    setRenew(true);
  };
  const handleCloseRenew = () => {
    setRenew(false);
  };

  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
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
          {payment?.status && (
            <Typography
              variant="h6"
              color="#EB5860"
              textTransform={"capitalize"}
              sx={{
                padding: "0px 6px",
                borderRadius: "12px",
                border: "1px solid #EB5860",
              }}
            >
              {payment?.status}
            </Typography>
          )}
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
          {payment?.lastRenewDate && (
            <Typography variant="h6" color="#2C2829">
              {formatDate(payment?.lastRenewDate)}
            </Typography>
          )}
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
          {payment?.amount && (
            <Typography variant="h6" color="#2C2829">
              ₹{payment?.amount}
            </Typography>
          )}
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
          {payment?.expiryDate && (
            <Typography variant="h6" color="#2C2829">
              {formatDate(payment?.expiryDate)}
            </Typography>
          )}
        </Stack>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={7}>
            {" "}
            {payment ? (
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <StyledButton
                  name="Renew"
                  variant="primary"
                  onClick={handleRenew}
                />
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <StyledButton
                  name="Add Subscription"
                  variant="primary"
                  onClick={() => setAdd(true)}
                />
              </Stack>
            )}
            <RenewForm
              open={renew}
              onClose={handleCloseRenew}
              category={"app"}
              data={payment}
            />
            <AddSubscription
              open={add}
              onClose={() => setAdd(false)}
              data={payment}
              category={"app"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
