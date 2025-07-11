import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
} from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useState } from "react";

const ApproveRejectDisplay = ({ open, onClose, data, onChange, loading }) => {
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onChange();
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
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color={"#4F4F4F"}>
            Rejection Preview
          </Typography>
          <Typography
            onClick={handleClear}
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
            Member Name
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {data?.name}
          </Typography>
        </Stack>
        <Divider />
        {data?.category && (
          <Stack
            spacing={2}
            padding={2}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
              Category
            </Typography>
            <Typography variant="h6" color={"#4A4647"}>
              {data?.category}
            </Typography>
          </Stack>
        )}
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
        <Stack spacing={2} padding={2}>
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Reason for Rejection
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {data?.reason}
          </Typography>
        </Stack>
      </DialogContent>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
        <StyledButton
          variant="secondary"
          name="Cancel"
          onClick={handleClear}
          disabled={loading}
        />
        <StyledButton
          variant="primary"
          name={loading ? "Sending..." : "Send"}
          onClick={handleSubmit}
          disabled={loading}
        />
      </Stack>
    </Dialog>
  );
};

export default ApproveRejectDisplay;
