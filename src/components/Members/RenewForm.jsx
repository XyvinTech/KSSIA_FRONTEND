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
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField ";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { StyledCalender } from "../../ui/StyledCalender";

const RenewForm = ({ open, onClose, onChange }) => {
  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };
  const option = [
    { value: 1, label: "1 Year" },
    { value: 2, label: "2 Year" },
    { value:3, label: "3 Year" },
  ];
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
            {" "}
            <Stack spacing={2} paddingTop={2}>
              <Typography variant="h6" color={"#333333"}>
                Time metric
              </Typography>
              <StyledSelectField placeholder={"Year"} options={option}/>
              <Typography variant="h6" color={"#333333"}>
                Value
              </Typography>
              <StyledSelectField placeholder={"Select Number"} />
              <Typography variant="h6" color={"#333333"}>
                New Expiry date
              </Typography>
              <StyledCalender placeholder={"Select Date"} />
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
            <StyledButton variant="primary" name="Confirm" type="submit" />
          </Stack>
        </form>
      </Dialog>{" "}
    </>
  );
};

export default RenewForm;
