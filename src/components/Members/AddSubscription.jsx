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
import { useParams } from "react-router-dom";
import StyledInput from "../../ui/StyledInput";
import { set } from "date-fns";

const AddSubscription = ({ open, onClose, data, category }) => {
  const { handleSubmit, control, setValue } = useForm();
  const { addPayments, setRefreshMember, payments, fetchParentSub } =
    usePaymentStore();
  const { id } = useParams();
  useEffect(() => {
    fetchParentSub();
  }, []);
  const onSubmit = async (data) => {
    try {
      const formData = {
        user: id,
        parentSub: data?.academicYear?.value,
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

  const option = payments?.map((item) => ({
    value: item?._id,
    label: item?.academicYear,
  })) || [];
  
    

console.log("option",option);

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
              Academic Year
            </Typography>
            <Controller
              name="academicYear"
              control={control}
              defaultValue="" // Default value for the academic year
              render={({ field }) => (
                <StyledSelectField
                  {...field}
                  placeholder="Year"
                  options={option}
                />
              )}
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
