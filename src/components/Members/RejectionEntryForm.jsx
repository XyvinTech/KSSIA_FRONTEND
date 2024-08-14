import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField ";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { useState } from "react";
import RejectForm from "./RejectForm";

const RejectionEntryForm = ({ open, onClose, onChange }) => {
  const { handleSubmit } = useForm();
  const [reject, setReject] = useState(false);
  const onSubmit = async () => {
    onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };
  const handleReject = (event) => {
    event.preventDefault();
    onClose();
    setReject(true);
  };
  const handleCloseReject = () => {
    setReject(false);
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
                Rejection notice
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
          <DialogContent
            sx={{ height: "auto", width: "430px", backgroundColor: "#F9F9F9" }}
          >
            {" "}
            <Stack spacing={2} paddingTop={2}>
              <Typography variant="h6" color={"#333333"}>
                Reason for Rejection
              </Typography>
              <StyledSelectField placeholder={"Select Category"} />
              <Typography variant="h6" color={"#333333"}>
                Description
              </Typography>
              <StyledMultilineTextField placeholder={"Add Message"} />{" "}
            </Stack>
          </DialogContent>
          <Stack
            direction={"row"}
            spacing={2}
            padding={2}
            justifyContent={"end"}
          >
            <StyledButton
              variant="secondary"
              name="Preview"
              onClick={(event) => handleReject(event)}
            />
            <StyledButton variant="primary" name="Send" type="submit" />
          </Stack>
        </form>
      </Dialog>{" "}
      <RejectForm open={reject} onClose={handleCloseReject} />
    </>
  );
};

export default RejectionEntryForm;
