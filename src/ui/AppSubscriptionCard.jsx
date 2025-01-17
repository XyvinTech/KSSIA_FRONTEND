import React, { useState } from "react";
import {
  Typography,
  Stack,
  Grid,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { StyledButton } from "./StyledButton";
import RenewForm from "../components/Members/RenewForm";
import moment from "moment";
import AddSubscription from "../components/Members/AddSubscription";
import { usePaymentStore } from "../store/payment-store";

export default function AppSubscriptionCard({ payment }) {
  const [add, setAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { patchPayments, setRefreshMember } = usePaymentStore();
  const handleRenew = () => {
    setIsUpdate(true);
    setAdd(true);
  };

  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };
  const handleReject = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    await patchPayments(payment?._id, { status: "cancelled" });
    setRefreshMember();
    setConfirmOpen(false);
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
              color="#2E7D32"
              sx={{
                padding: "0px 6px",
                borderRadius: "12px",
                border: "1px solid #2E7D32",
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
            Year
          </Typography>
          {payment?.parentSub?.academicYear && (
            <Typography variant="h6" color="#2C2829">
              {payment?.parentSub?.academicYear}
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
          {payment?.parentSub?.expiryDate && (
            <Typography variant="h6" color="#2C2829">
              {formatDate(payment?.parentSub?.expiryDate)}
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
                {payment?.status === "active" && (
                  <StyledButton
                    name="Cancel"
                    variant="secondary"
                    onClick={(e) => {
                      handleReject(e);
                    }}
                  />
                )}
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
              onClose={() => {
                setAdd(false);
                setIsUpdate(false);
              }}
              category={"app"}
              payment={payment}
              isUpdate={isUpdate}
            />
          </Grid>
          <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            aria-labelledby="confirm-dialog-title"
          >
            <DialogTitle id="confirm-dialog-title">
              Confirm Rejection
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to reject this payment?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <StyledButton
                name="Cancel"
                variant="secondary"
                onClick={() => setConfirmOpen(false)}
              />
              <StyledButton
                name={"Reject"}
                variant="primary"
                onClick={(e) => handleConfirm(e)}
              />
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
}
