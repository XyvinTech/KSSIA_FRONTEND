import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { useState } from "react";
import RejectForm from "./RejectForm";
import { usePaymentStore } from "../../store/payment-store";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField ";

const RejectionEntryForm = ({ open, onClose, data,onChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },getValues
  } = useForm();
  const { patchPayments } = usePaymentStore();
  const [reject, setReject] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const onSubmit = async (formData) => {
    const updateData = {
      reason: formData?.reason,
      status: "rejected",
    };
    await patchPayments(data?._id, updateData);
    onChange();
    onClose();
    
  };

  const handleReject = (event) => {
    event.preventDefault();
    setPreviewData({ ...data, reason: getValues("reason") }); // Capture the reason and other data
    setReject(true);
  };

  const handleCloseReject = () => {
    setReject(false);
    setPreviewData(null);
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
                onClick={onClose}
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
            <Stack spacing={2} paddingTop={2}>
              <Typography variant="h6" color={"#333333"}>
                Reason for Rejection
              </Typography>
              <Controller
                name="reason"
                control={control}
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <>
                    <StyledMultilineTextField
                      placeholder={"Add reason"}
                      {...field}
                    />
                    {errors.reason && (
                      <span style={{ color: "red" }}>
                        {errors.reason.message}
                      </span>
                    )}
                  </>
                )}
              />
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
              onClick={handleReject}
            />
            <StyledButton variant="primary" name="Send" type="submit" />
          </Stack>
        </form>
      </Dialog>

      {/* Open RejectForm with preview data */}
      <RejectForm
        open={reject}
        onClose={handleCloseReject}
        data={previewData} // Pass the preview data
      />
    </>
  );
};

export default RejectionEntryForm;
