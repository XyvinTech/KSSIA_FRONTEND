import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useState } from "react";
import { usePaymentStore } from "../store/payment-store";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { StyledButton } from "../ui/StyledButton";
import ApproveRejectDisplay from "./ApproveRejectDisplay";
import { useApprovalStore } from "../store/approval-store";
import { useProductsStore } from "../store/productStore";

const ProductReject = ({ open, onClose, data, onChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { patchProducts } = useProductsStore();
  const [reject, setReject] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const updateData = {
        reason: formData?.reason,
        status: "rejected",
      };
      await patchProducts(data?._id, updateData);
      onChange();
      onClose();
      reset();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReject = (event) => {
    event.preventDefault();
    setPreviewData({ ...data, reason: getValues("reason") });
    setReject(true);
  };

  const handleCloseReject = () => {
    setReject(false);
    setPreviewData(null);
    reset();
  };
  const handleDialogClose = () => {
    reset(); // Reset the form when the dialog is closed
    onClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
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
                onClick={handleDialogClose}
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

      <ApproveRejectDisplay
        open={reject}
        onClose={handleCloseReject}
        data={previewData}
        onChange={onSubmit}
      />
    </>
  );
};

export default ProductReject;
