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

const StyledFilter = ({ open, onClose, onApply }) => {
  const [membershipId, setMembershipId] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");

  const handleClear = (event) => {
    event.preventDefault();
    setName("");
    setMembershipId("");
    setDesignation("");
    setCompanyName("");
    onApply({ name: "", membershipId: "", designation: "", companyName: "" });
    onClose();
  };

  const handleApply = () => {
    onApply({ name, membershipId, designation, companyName });
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
            placeholder={"Enter Member Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography>Membership Id</Typography>
          <StyledInput
            placeholder={"Enter Membership Id"}
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
          />
          <Typography>Designation</Typography>
          <StyledInput
            placeholder={"Enter Designation"}
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <Typography>Company Name</Typography>
          <StyledInput
            placeholder={"Enter Company Name"}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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

export default StyledFilter;
