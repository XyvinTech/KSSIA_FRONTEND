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

const MemberShipRenewal = ({ open, onClose, onChange }) => {
  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
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
              onClick={(event) => handleClear(event)}
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
              Prabodhan Fitzgerald
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
              8976543322
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
              Rejected
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
              ₹2000
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
              12th July 2025
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
              G pay
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
              Invoice ID
            </Typography>
            <Typography variant="h6" color={"#4A4647"}>
              VCRU65789900
            </Typography>
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Deny"
            onClick={(event) => handleClear(event)}
          />
          <StyledButton variant="primary" name="Approve" type="submit" />
        </Stack>
      </form>
    </Dialog>
  );
};

export default MemberShipRenewal;
