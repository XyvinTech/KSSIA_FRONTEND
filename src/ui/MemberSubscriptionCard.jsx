import React, { useState } from "react";
import { Typography, Stack, Grid, Box, Divider } from "@mui/material";
import { StyledButton } from "./StyledButton";
import RenewForm from "../components/Members/RenewForm";
import SuspendProfile from "../components/SuspendProfile";
import { usePaymentStore } from "../store/payment-store";

export default function MemberSubscriptionCard({ payment,onChange }) {
  const [renew, setRenew] = useState(false);
  const { patchPayments } = usePaymentStore();
  const [suspend, setSuspend] = useState(false);
  const handleRenew = () => {
    setRenew(true);
  };
  const handleCloseRenew = () => {
    setRenew(false);
  };
  const handleSuspend = () => {
    setSuspend(true);
  };
  const handleCloseSuspend = () => {
    setSuspend(false);
  };
  const handleSuspendMembership = async () => {
    const updateData = { status: "rejected" };
    await patchPayments(payment?._id, updateData);
    onChange();
  };
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
            Membership Subscription
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
            Status
          </Typography>
          <Typography
            variant="h6"
            color="#2E7D32"
            sx={{
              padding: "0px 6px",
              borderRadius: "12px",
              border: "1px solid #2E7D32",
            }}
          >
            {payment?.status}
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
            {payment?.date}
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
            ₹{payment?.amount}
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
            {payment?.renewal}
          </Typography>
        </Stack>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={6}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <StyledButton
                name="Suspend"
                variant="third"
                onClick={handleSuspend}
              />

              <StyledButton
                name="Renew"
                variant="primary"
                onClick={handleRenew}
              />
            </Stack>{" "}
            <RenewForm open={renew} onClose={handleCloseRenew} />
            <SuspendProfile
              open={suspend}
              onClose={handleCloseSuspend}
              onChange={handleSuspendMembership}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
