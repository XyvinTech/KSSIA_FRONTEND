import { useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { StyledButton } from "./StyledButton";
import StyledInput from "./StyledInput";
import { StyledCalender } from "./StyledCalender";
import StyledSelectField from "./StyledSelectField";

const ProductFilter = ({ open, onClose, onApply }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");

  const handleClear = (event) => {
    event.preventDefault();
    setName("");
    setFrom("");
    setTo("");
    setStatus(null);
    onApply({ name: "", date: "", status: "", from: "", to: "" });
    onClose();
  };

  const handleApply = () => {
    onApply({ name, from, to, status: status?.value || "" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          position: "absolute",
          top: 0,
          right: 0,
          height: "100vh",
          width: "430px",
        },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color={"#4F4F4F"}>
            Filter
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
      <DialogContent sx={{ padding: 0 }}>
        <Stack spacing={2} padding={2}>
          <Typography>Name</Typography>
          <StyledInput
            placeholder={"Enter Product Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography>From</Typography>
          <StyledCalender
            value={from}
            onChange={(selectedDate) => setFrom(selectedDate)}
          />
          <Typography>To</Typography>
          <StyledCalender
            value={to}
            onChange={(selectedDate) => setTo(selectedDate)}
          />
          <Typography>Status</Typography>
          <StyledSelectField
            placeholder="Select Status"
            options={[
              { value: "pending", label: "Pending" },
              { value: "accepted", label: "Accepted" },
            ]}
            value={status}
            onChange={(selectedOption) => setStatus(selectedOption)}
          />
        </Stack>
      </DialogContent>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
        <StyledButton variant="secondary" name="Reset" onClick={handleClear} />
        <StyledButton variant="primary" name="Apply" onClick={handleApply} />
      </Stack>
    </Dialog>
  );
};

export default ProductFilter;
