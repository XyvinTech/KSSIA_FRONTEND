import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useState } from "react";
import RejectionEntryForm from "./Members/RejectionEntryForm";
import { usePaymentStore } from "../store/payment-store";
import moment from "moment";

const MemberShipRenewal = ({ open, onClose, data, onChange }) => {
  const { patchPayments } = usePaymentStore();
  const [rejectOpen, setRejectOpen] = useState(false);
  const handleCloseReject = (id) => {
    setRejectOpen(false);
  };
  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    const updateData = { status: "accepted" };
    await patchPayments(data?._id, updateData);
    onChange();
    onClose();
  };
  const handleClear = (event) => {
    event.preventDefault();
    setRejectOpen(true);
    onClose();
  };
  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };
  const handleChange = () => {
    setRejectOpen(false);
    onChange();
  };
  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };
  const formatTime = (time) => {
    return moment(time).format("h:mm A");
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { borderRadius: "12px" },
        }}
      >
        {" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ height: "auto", padding: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" color={"#4F4F4F"}>
                Membership renewal
              </Typography>
              <Typography
                onClick={(event) => handleClose(event)}
                color="#E71D36"
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ height: "auto", width: "430px", padding: 0 }}>
            <Stack
              spacing={2}
              padding={2}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
                Payee name
              </Typography>
              <Typography variant="h6" color={"#4A4647"}>
                {data?.name}
              </Typography>
            </Stack>{" "}
            <Divider />
            <Stack
              spacing={2}
              padding={2}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
                Phone number
              </Typography>
              <Typography variant="h6" color={"#4A4647"}>
                {data?.mobile}
              </Typography>
            </Stack>{" "}
            <Divider />
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
                color="#EB5860"
                sx={{
                  padding: "0px 6px",
                  borderRadius: "12px",
                  border: "1px solid #EB5860",
                }}
              >
                {data?.status}
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
                Amount paid
              </Typography>
              <Typography variant="h6" color={"#4A4647"}>
                ₹{data?.amount}
              </Typography>
            </Stack>{" "}
            <Divider />
            <Stack
              spacing={2}
              padding={2}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
                Payment date and time
              </Typography>
              <Typography variant="h6" color={"#4A4647"}>
                {formatDate(data?.date)} {formatTime(data?.time)}
              </Typography>
            </Stack>{" "}
            <Divider />
            <Stack
              spacing={2}
              padding={2}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
                Mode of payment
              </Typography>
              <Typography variant="h6" color={"#4A4647"}>
                {data?.mode_of_payment}
              </Typography>
            </Stack>
            {/* <Divider />
            <Stack
              spacing={2}
              padding={2}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
                Invoice ID
              </Typography>
              <Typography variant="h6" color={"#4A4647"}>
                {data?.invoice}
              </Typography>
            </Stack> */}
          </DialogContent>{" "}
          {data?.status === "pending" && (
            <Stack
              direction={"row"}
              spacing={2}
              padding={2}
              justifyContent={"end"}
            >
              <StyledButton
                variant="secondary"
                name="Deny"
                onClick={(event) => handleClear(event)}
              />
              <StyledButton variant="primary" name="Approve" type="submit" />
            </Stack>
          )}
        </form>
      </Dialog>
      <RejectionEntryForm
        open={rejectOpen}
        onClose={handleCloseReject}
        data={data}
        onChange={handleChange}
      />
    </>
  );
};

export default MemberShipRenewal;
