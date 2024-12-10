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
import { useParams } from "react-router-dom";
import StyledInput from "../../ui/StyledInput";

const AddSubscription = ({ open, onClose, data,category }) => {
  const { handleSubmit, control, setValue } = useForm();
  const { addPayments, setRefreshMember } = usePaymentStore();
  const [timeMetric, setTimeMetric] = useState(null);
  const { id } = useParams();
  const onSubmit = async (data) => {
    try {
      const formData = {
        user: id,
        expiryDate: data?.expiryDate,
        category: category,
        amount: data?.amount,
      };
      await addPayments(formData);
      setRefreshMember();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleTimeMetricChange = (selectedOption) => {
    const { value } = selectedOption;
    setTimeMetric(value);

    if (value) {
      // Calculate days to add based on the selected value
      const daysToAdd = value * 365;
      const newExpiryDate = moment(data?.renewal)
        .add(daysToAdd, "days") // Add the calculated number of days
        .format("YYYY-MM-DD");

      // Log the calculated expiry date
      console.log(
        "Data Renewal Date:",
        moment(data?.renewal).format("YYYY-MM-DD")
      );
      console.log("New Expiry Date:", newExpiryDate);

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
              Add
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

export default AddSubscription;
