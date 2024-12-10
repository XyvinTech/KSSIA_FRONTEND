import React, { useState } from "react";
import { Typography, Stack, Grid, Box, Divider } from "@mui/material";
import { StyledButton } from "./StyledButton";
import RenewForm from "../components/Members/RenewForm";
import SuspendProfile from "../components/SuspendProfile";
import { usePaymentStore } from "../store/payment-store";
import moment from "moment";
import SuspendPayment from "../components/SuspendPayment";
import AddSubscription from "../components/Members/AddSubscription";
import { useMemberStore } from "../store/member-store";
import { useParams } from "react-router-dom";

export default function MemberSubscriptionCard({ payment, onChange }) {
  const [renew, setRenew] = useState(false);
  const { patchPayments } = usePaymentStore();
  const [add, setAdd] = useState(false);
  const { suspend } = useMemberStore();
  const [suspendOpen, setSuspendOpen] = useState(false);
  const {id}=useParams();
  const handleRenew = () => {
    setRenew(true);
  };

  const handleCloseRenew = () => {
    setRenew(false);
  };
  const handleSuspend = () => {
    setSuspendOpen(true);
  };
  const handleCloseSuspend = () => {
    setSuspendOpen(false);
  };
  const handleSuspendMembership = async () => {
    await suspend(id);
    onChange();
  };
  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };
  const handleChange = () => {
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
          {payment?.status &&
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
          </Typography>}
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
          {payment?.lastRenewDate &&
          <Typography variant="h6" color="#2C2829">
            {formatDate(payment?.lastRenewDate)}
          </Typography>}
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
          {payment?.amount &&
          <Typography variant="h6" color="#2C2829">
            ₹{payment?.amount}
          </Typography>}
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
          {payment?.expiryDate &&
          <Typography variant="h6" color="#2C2829">
            {formatDate(payment?.expiryDate)}
          </Typography>}
        </Stack>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={6}>
            {payment ? (
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                {/* <StyledButton
                  name="Suspend"
                  variant="third"
                  onClick={handleSuspend}
                /> */}
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
             <AddSubscription
              open={add}
              onClose={() => setAdd(false)}
              data={payment}
              category={"membership"}
            />
            <RenewForm
              open={renew}
              onClose={handleCloseRenew}
              category={"membership"}
              data={payment}
              onChange={handleChange}
            />
            <SuspendPayment
              open={suspendOpen}
              onClose={handleCloseSuspend}
              onChange={handleSuspendMembership}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
