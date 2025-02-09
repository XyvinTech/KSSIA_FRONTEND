import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import moment from "moment";
import { StyledButton } from "../../ui/StyledButton";
import StyledSelectField from "../../ui/StyledSelectField";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { StyledCalender } from "../../ui/StyledCalender";
import { usePaymentStore } from "../../store/payment-store";
import StyledInput from "../../ui/StyledInput";
import { useParams } from "react-router-dom";

const RenewForm = ({ open, onClose, data,category }) => {
  const { handleSubmit, control, setValue, reset } = useForm();
  const { updatePayment, setRefreshMember } = usePaymentStore();
  const [timeMetric, setTimeMetric] = useState(null);
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const formData = {
        user: id,
        expiryDate: form?.expiryDate,
        category: category,
        amount: form?.amount,
      };
      await updatePayment(data?._id, formData);
      setRefreshMember();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    onClose();
  };

  const handleTimeMetricChange = (selectedOption) => {
    const { value } = selectedOption;
    setTimeMetric(value);

    if (value) {
      const daysToAdd = value * 365;
      const newExpiryDate = moment(data?.expiryDate)
        .add(daysToAdd, "days") // Add the calculated number of days
        .format("YYYY-MM-DD");

      setValue("expiryDate", newExpiryDate);
    }
  };

  const option = [
    { value: 1, label: "1 Year" },
    { value: 2, label: "2 Years" },
    { value: 3, label: "3 Years" },
  ];

  return (
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
              Renew
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
          sx={{ height: "auto", width: "430px", backgroundColor: "#FFF" }}
        >
          <Stack spacing={2} paddingTop={2}>
            <Typography variant="h6" color={"#333333"}>
              Time metric
            </Typography>
            <StyledSelectField
              placeholder={"Year"}
              options={option}
              onChange={handleTimeMetricChange}
            />
            <Typography variant="h6" color={"#333333"}>
              Amount
            </Typography>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder={"amount"} {...field} />
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              New Expiry date
            </Typography>
            <Controller
              name="expiryDate"
              control={control}
              defaultValue={""}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <StyledCalender placeholder={"Select Date"} {...field} />
              )}
            />
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            onClick={(event) => handleClear(event)}
          />
          <StyledButton variant="primary" name="Confirm" type="submit" />
        </Stack>
      </form>
    </Dialog>
  );
};

export default RenewForm;
