import { useEffect, useState } from "react";
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
import StyledSelectField from "./StyledSelectField";
import { useMemberStore } from "../store/member-store";

const StyledFilter = ({ open, onClose, onApply }) => {
  const { memberStatus, memberSub } = useMemberStore();
  const [membershipId, setMembershipId] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [name, setName] = useState("");

  const handleClear = (event) => {
    event.preventDefault();
    setName("");
    setMembershipId("");
    setDesignation("");
    setCompanyName("");
    setStatus(null);
    setSubscription(null);
    onApply({
      name: "",
      membershipId: "",
      designation: "",
      status: "",
      subscription: "",
      companyName: "",
    });
    onClose();
  };

  const handleApply = (appliedStatus = status, appliedSub = subscription) => {
    onApply({
      name,
      membershipId,
      designation,
      companyName,
      status: appliedStatus?.value || status?.value || "",
      subscription: appliedSub?.value || subscription?.value || "",
    });
    onClose();
  };
  useEffect(() => {
    if (memberStatus) {
      const newStatus = { value: memberStatus, label: memberStatus };
      setStatus(newStatus);
      handleApply(newStatus);
    }
    if (memberSub) {
      const newStatus = { value: memberSub, label: memberSub };
      setSubscription(newStatus);
      handleApply(newStatus);
    }
  }, [memberStatus, memberSub]);
  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
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
        <Stack spacing={2} padding={2} mb={12}>
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
          <Typography>Status</Typography>
          <StyledSelectField
            placeholder="Select Status"
            options={[
              { value: "active", label: "active" },
              { value: "inactive", label: "inactive" },
              { value: "suspended", label: "suspended" },
            ]}
            value={status}
            onChange={handleStatusChange}
          />
          <Typography>Subscription</Typography>
          <StyledSelectField
            placeholder="Select Subscription"
            options={[
              { value: "free", label: "Free" },
              { value: "premium", label: "Premium" },
            ]}
            value={subscription}
            onChange={(selectedOption) => setSubscription(selectedOption)}
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
