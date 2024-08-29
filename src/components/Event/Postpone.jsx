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

import { StyledCalender } from "../../ui/StyledCalender";
import { StyledTime } from "../../ui/StyledTime";
import { useEventStore } from "../../store/event-store";
import { useEffect } from "react";

const Postpone = ({ open, onClose, onChange, data }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { postpone } = useEventStore();
  useEffect(() => {
    if (data) {
      setValue("startDate", data.startDate);
      setValue("startTime", data.startTime);
      setValue("endDate", data.endDate);
      setValue("endTime", data.endTime);
    }
  }, [data, setValue]);
 
  const onSubmit = async (updateData) => {
    const formData = new FormData();
    formData.append("date", updateData.date);
    formData.append("time", updateData.time);
    await postpone(data?._id, formData);
    onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
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
                Postpone
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
                Start Date
              </Typography>
              <Controller
                name="startDate"
                control={control}
                defaultValue={""}
                rules={{ required: " Date is required" }}
                render={({ field }) => (
                  <>
                    <StyledCalender
                      label="Select Date from Calender"
                      {...field}
                      value={field.value}
                    />
                    {errors.startDate && (
                      <span style={{ color: "red" }}>
                        {errors.startDate.message}
                      </span>
                    )}
                  </>
                )}
              />
              <Typography variant="h6" color={"#333333"}>
                Start Time
              </Typography>
              <Controller
                name="startTime"
                control={control}
                defaultValue=""
                rules={{ required: "Time is required" }}
                render={({ field }) => (
                  <>
                    <StyledTime
                      label="Select Time"
                      {...field}
                      value={field.value}
                    />
                    {errors.startTime && (
                      <span style={{ color: "red" }}>
                        {errors.startTime.message}
                      </span>
                    )}{" "}
                  </>
                )}
              />
              <Typography variant="h6" color={"#333333"}>
                End Date
              </Typography>
              <Controller
                name="endDate"
                control={control}
                defaultValue={""}
                rules={{ required: " Date is required" }}
                render={({ field }) => (
                  <>
                    <StyledCalender
                      label="Select Date from Calender"
                      {...field}
                      value={field.value}
                    />
                    {errors.endDate && (
                      <span style={{ color: "red" }}>
                        {errors.endDate.message}
                      </span>
                    )}
                  </>
                )}
              />
              <Typography variant="h6" color={"#333333"}>
                End Time
              </Typography>
              <Controller
                name="endTime"
                control={control}
                defaultValue=""
                rules={{ required: "Time is required" }}
                render={({ field }) => (
                  <>
                    <StyledTime
                      label="Select Time"
                      {...field}
                      value={field.value}
                    />
                    {errors.endTime && (
                      <span style={{ color: "red" }}>
                        {errors.endTime.message}
                      </span>
                    )}{" "}
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
              name="Cancel"
              onClick={(event) => handleClear(event)}
            />
            <StyledButton variant="primary" name="Apply" type="submit" />
          </Stack>
        </form>
      </Dialog>{" "}
    </>
  );
};

export default Postpone;
