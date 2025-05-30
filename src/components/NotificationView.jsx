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
import moment from "moment";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { da } from "date-fns/locale";

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
      <DialogTitle sx={{ padding: 2 }}>
        <Box display="flex" justifyContent="flex-end">
          <Box
            onClick={handleClear}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ width: "500px", padding: 0 }}>
        <Stack spacing={2} padding={3}>
          {data?.file_url && (
            <Box
              component="img"
              src={data.file_url}
              alt="Notification"
              width="100%"
              height="auto"
              sx={{ borderRadius: "8px" }}
            />
          )}

          <Box>
            <Typography variant="h5" color="#2C2829" fontWeight="bold">
              {data?.subject}
            </Typography>

            {data?.createdAt && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {moment(data.createdAt)
                  .format("DD-MM-YYYY, hh.mmA")
                  .toLowerCase()}
              </Typography>
            )}
          </Box>

          <Typography variant="body1" color="#4A4647">
            {data?.content}
          </Typography>

          {data?.link_url && (
            <Link
              href={
                data?.link_url?.startsWith("http")
                  ? data?.link_url
                  : `https://${data?.link_url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ mt: 1 }}
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
