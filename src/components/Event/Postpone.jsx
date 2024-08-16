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
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

import { StyledCalender } from "../../ui/StyledCalender";
import { StyledTime } from "../../ui/StyledTime";

const Postpone = ({ open, onClose, onChange }) => {
  const { handleSubmit } = useForm();
  const onSubmit = async () => {
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
              <StyledCalender placeholder={"Select Date from Calendar"} />
              <Typography variant="h6" color={"#333333"}>
                Time
              </Typography>
              <StyledTime placeholder={"Add Time"} />{" "}
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
