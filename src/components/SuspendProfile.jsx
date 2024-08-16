import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";

const SuspendProfile = ({ open, onClose, onChange }) => {
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    // onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px", padding: 2 },
      }}
    >
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ height: "auto", width: "330px" }}>
          <Stack
            // direction={"row"}
            spacing={2}
            paddingTop={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h3" color={"#2C2829"} textAlign={"center"}>
              Are you sure you want to suspend the profile ?{" "}
            </Typography>
            <Typography variant="h7" color={"#87898E"} textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur. Eget in ac urna
              suspendisse.{" "}
            </Typography>
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} paddingBottom={2} justifyContent={"end"}>
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

export default SuspendProfile;
