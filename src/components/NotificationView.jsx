import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Link,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";

const NotificationView = ({ open, onClose, data }) => {
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="end" alignItems="center">
          <Typography
            onClick={(event) => handleClear(event)}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ height: "auto", width: "500px", padding: 0 }}>
        <Stack spacing={2} padding={2} justifyContent={"center"}>
          {data?.file_url && (
            <img
              src={data.file_url}
              alt="Notification"
              width={"461px"}
              height={"262px"}
            />
          )}

          <Typography variant="h5" color={"#2C2829"} fontWeight="bold">
            {data?.subject}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {data?.content}
          </Typography>
          {data?.link_url && (
            <Link
              href={data.link_url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              View more details
            </Link>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationView;
