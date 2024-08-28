import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import moment from "moment";
import { StyledButton } from "../../ui/StyledButton";
import StyledSelectField from "../../ui/StyledSelectField";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { StyledCalender } from "../../ui/StyledCalender";
import { usePaymentStore } from "../../store/payment-store";

const ChangeSubscription = ({ open, onClose, onChange, data }) => {
  const { handleSubmit, control, setValue } = useForm();
  const { updatePayment } = usePaymentStore();
  const [timeMetric, setTimeMetric] = useState(null);
  useEffect(() => {
    if (data) {
      setValue("category", {
        value: data.category,
        label:
          data.category === "membership" ? "Membership renewal" : "App renewal",
      });
      setValue("expiryDate", moment(data.renewal).format("YYYY-MM-DD"));
    }
  }, [data, setValue]);
  const onSubmit = async (formData) => {
    const dataToSend = new FormData();
    dataToSend.append("year_count", timeMetric);
    dataToSend.append("category", formData.category.value);
    dataToSend.append("member", data.member);
    dataToSend.append("date", data.date);
    dataToSend.append("time", data.time);
    dataToSend.append("amount", data.amount);
    dataToSend.append("mode_of_payment", data.mode_of_payment);
    dataToSend.append("status", data.status);
    updatePayment(data?._id, dataToSend);
    onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleTimeMetricChange = (selectedOption) => {
    const { value } = selectedOption;
    setTimeMetric(value);

    if (value) {
      const daysToAdd = value * 365;
      const newExpiryDate = moment(data?.renewal)
        .add(daysToAdd, "days")
        .format("YYYY-MM-DD");
      console.log(
        "Data Renewal Date:",
        moment(data?.renewal).format("YYYY-MM-DD")
      );
      console.log("New Expiry Date:", newExpiryDate);

      setValue("expiryDate", newExpiryDate);
    }
  };
  const category = [
    { value: "membership", label: "Membership renewal" },
    { value: "app", label: "App renewal" },
  ];
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
              Change subscription
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
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Payment Category is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder=" payment category"
                    options={category}
                    {...field}
                  />
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              Time metric
            </Typography>
            <StyledSelectField
              placeholder={"Year"}
              options={option}
              onChange={handleTimeMetricChange}
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

export default ChangeSubscription;
