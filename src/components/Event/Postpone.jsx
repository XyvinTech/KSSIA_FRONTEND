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
      setValue("date", data.date);
      setValue("time", data.time);
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
                New Date
              </Typography>
              <Controller
                name="date"
                control={control}
                defaultValue={""}
                rules={{ required: " Date is required" }}
                render={({ field }) => (
                  <>
                    <StyledCalender
                      {...field}
                      placeholder={"Select Date from Calendar"}
                    />
                    {errors.date && (
                      <span style={{ color: "red" }}>
                        {errors.date.message}
                      </span>
                    )}
                  </>
                )}
              />
              <Typography variant="h6" color={"#333333"}>
                Time
              </Typography>
              <Controller
                name="time"
                control={control}
                defaultValue=""
                rules={{ required: "Time is required" }}
                render={({ field }) => (
                  <>
                    <StyledTime placeholder={"Add Time"} {...field} />{" "}
                    {errors.time && (
                      <span style={{ color: "red" }}>
                        {errors.time.message}
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
