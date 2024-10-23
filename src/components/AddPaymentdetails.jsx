import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, Skeleton } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledCalender } from "../ui/StyledCalender.jsx";
import { StyledTime } from "../ui/StyledTime.jsx";
import { useDropDownStore } from "../store/dropDownStore.js";
import { usePaymentStore } from "../store/payment-store.js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPaymentdetails() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { paymentId, isUpdate } = location.state || {};
  const { addPayments, fetchPaymentById, updatePayment, payment, loadings } =
    usePaymentStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { users, fetchUsers } = useDropDownStore();
  useEffect(() => {
    let filter = {};
    filter.limit = "full";
    fetchUsers(filter);
  }, []);
  useEffect(() => {
    if (isUpdate && paymentId) {
      fetchPaymentById(paymentId);
    }
  }, [paymentId, isUpdate]);

  useEffect(() => {
    if (payment && isUpdate) {
      setValue("date", payment.date || "");
      setValue("time", payment.time || "");
      setValue("amount", payment.amount || "");
      setValue("year_count", payment.year_count || "");
      setValue("mode_of_payment", payment.mode_of_payment || "");
      const selectedCategory = category.find(
        (item) => item.value === payment.category
      );
      setValue("category", selectedCategory || "");
      const selectedPlan = plan.find((item) => item.value === payment.plan);
      setValue("plan", selectedPlan || "");
      const selectedStatus = status.find(
        (item) => item.value === payment.status
      );
      const sellerUser = users.find(
        (user) => user?._id === payment.member?._id
      );
      if (sellerUser) {
        setValue("member", {
          value: sellerUser._id,
          label: `${sellerUser.name.first_name} ${sellerUser.name.middle_name} ${sellerUser.name.last_name}`,
        });
      }
      setValue("status", selectedStatus || "");
      setValue("remarks", payment.remarks || "");
      setValue("file", payment.invoice_url || "");
    }
  }, [payment, isUpdate, setValue]);

  const category = [
    { value: "membership", label: "Membership renewal" },
    { value: "app", label: "App renewal" },
  ];
  const plan = [
    { value: "free", label: "Free" },
    { value: "premium", label: "Premium" },
  ];
  const status = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Complete" },
  ];
  const option =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user._id,
          label: `${user.name.first_name} ${user.name.middle_name} ${user.name.last_name}`,
        }))
      : [];
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("member", data.member.value);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("amount", data.amount);
      formData.append("mode_of_payment", data.mode_of_payment);
      formData.append("category", data.category.value);
      formData.append("status", data.status.value);
      formData.append("remarks", data.remarks);
      formData.append("year_count", data.year_count);
      formData.append("plan", data.plan.value);
      if (!isUpdate || (isUpdate && data.file instanceof File)) {
        formData.append("file", data.file);
      }

      if (isUpdate && paymentId) {
        await updatePayment(paymentId, formData);
      } else {
        await addPayments(formData);
      }
      navigate(`/payments`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadings ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"800px"}
          sx={{ bgcolor: "white" }}
        />
      ) : (
        <>
          <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Name of the member
                  </Typography>
                  <Controller
                    name="member"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Member name is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          placeholder="Enter member name"
                          options={option}
                          {...field}
                        />
                        {errors.member && (
                          <span style={{ color: "red" }}>
                            {errors.member.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                {/* <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Member ID
            </Typography>
            <Controller
              name="memberid"
              control={control}
              defaultValue=""
              rules={{ required: "Member ID is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Member ID" {...field}/>
                  {errors.memberid && (
                    <span style={{ color: "red" }}>{errors.memberid.message}</span>
                  )}
                </>
              )}
            />
          </Grid> */}
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Date
                  </Typography>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue=""
                    rules={{ required: " Date is required" }}
                    render={({ field }) => (
                      <>
                        <StyledCalender
                          label="Select Date from Calender"
                          {...field}
                        />
                        {errors.date && (
                          <span style={{ color: "red" }}>
                            {errors.date.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Time
                  </Typography>
                  <Controller
                    name="time"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Time is required" }}
                    render={({ field }) => (
                      <>
                        <StyledTime label="Select Time" {...field} />
                        {errors.time && (
                          <span style={{ color: "red" }}>
                            {errors.time.message}
                          </span>
                        )}{" "}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Amount
                  </Typography>
                  <Controller
                    name="amount"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Amount is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder="Enter the payment "
                          {...field}
                        />
                        {errors.amount && (
                          <span style={{ color: "red" }}>
                            {errors.amount.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Mode of Payment
                  </Typography>
                  <Controller
                    name="mode_of_payment"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Mode of payment is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder="Enter the mode of payment "
                          {...field}
                        />
                        {errors.mode_of_payment && (
                          <span style={{ color: "red" }}>
                            {errors.mode_of_payment.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Category
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
                        {errors.category && (
                          <span style={{ color: "red" }}>
                            {errors.category.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Status
                  </Typography>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Status of payment is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          placeholder="Status"
                          options={status}
                          {...field}
                        />
                        {errors.status && (
                          <span style={{ color: "red" }}>
                            {errors.status.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Upload invoice
                  </Typography>
                  <Controller
                    name="file"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Invoice image is required" }}
                    render={({ field }) => (
                      <>
                        <StyledEventUpload
                          label="Upload Product Image"
                          onChange={field.onChange}
                          value={field.value}
                        />
                        {errors.file && (
                          <span style={{ color: "red" }}>
                            {errors.file.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Remarks
                  </Typography>
                  <Controller
                    name="remarks"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Remarks is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder="Add any Remarks "
                          {...field}
                        />
                        {errors.remarks && (
                          <span style={{ color: "red" }}>
                            {errors.remarks.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Plan
                  </Typography>
                  <Controller
                    name="plan"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Plan is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          options={plan}
                          placeholder="Add plan "
                          {...field}
                        />
                        {errors.plan && (
                          <span style={{ color: "red" }}>
                            {errors.plan.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Year Count
                  </Typography>
                  <Controller
                    name="year_count"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Year Count is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                         
                          placeholder="Add Year Count "
                          {...field}
                        />
                        {errors.year_count && (
                          <span style={{ color: "red" }}>
                            {errors.year_count.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                  {" "}
                  <Stack direction={"row"} spacing={2}>
                    <StyledButton
                      name="Cancel"
                      variant="secondary"
                      onClick={(e) => handleClear(e)}
                      style={{ width: "auto" }}
                    >
                      Cancel
                    </StyledButton>
                    <StyledButton
                      name={loading ? "Saving..." : "Save"}
                      variant="primary"
                      type="submit"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </Box>
        </>
      )}
    </>
  );
}
