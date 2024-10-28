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
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(null); // Set default as null for no selection
  const [name, setName] = useState("");

  const handleClear = (event) => {
    event.preventDefault();
    setName("");
    setDate("");
    setStatus(null);
    onApply({ name: "", date: "", status: "" });
    onClose();
  };

  const handleApply = () => {
    onApply({ name, date, status: status?.value || "" });
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
          <Typography>Date</Typography>
          <StyledCalender
            value={date}
            onChange={(selectedDate) => setDate(selectedDate)}
          />
          <Typography>Status</Typography>
          <StyledSelectField
            placeholder="Select Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            value={status} // Pass the full selected option object
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
