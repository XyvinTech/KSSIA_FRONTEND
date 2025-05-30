import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Link,
  Chip,
} from "@mui/material";
import moment from "moment";
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
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          maxWidth: "600px",
          width: "100%",
          margin: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle sx={{ padding: "16px 24px" }}>
        <Box display="flex" justifyContent="flex-end">
          <Box
            onClick={handleClear}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f2f5",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon style={{ width: 24, height: 24, color: "#666" }} />
          </Box>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: "#e8ecef" }} />

      <DialogContent sx={{ padding: 0 }}>
        <Stack spacing={3} padding={{ xs: 2, sm: 4 }}>
          {data?.media_url && (
            <Box
              component="img"
              src={data.media_url}
              alt="Notification Media"
              sx={{
                width: "100%",
                maxHeight: "300px",
                borderRadius: "12px",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
          )}

          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
              <Typography
                variant="h4"
                sx={{
                  color: "#1a1a1a",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                }}
              >
                {data?.subject}
              </Typography>
              {data?.type && (
                <Chip
                  label={data.type.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1565c0",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    borderRadius: "6px",
                    padding: "2px 4px",
                  }}
                />
              )}
            </Stack>

            {data?.createdAt && (
              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  mt: 0.5,
                  fontSize: "0.9rem",
                }}
              >
                {moment(data.createdAt)
                  .format("DD MMMM YYYY, hh:mm A")
                  .toLowerCase()}
              </Typography>
            )}

            {data?.to?.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  mt: 1.5,
                  fontSize: "0.9rem",
                }}
              >
                <strong>To:</strong>{" "}
                {data.to.map((user, index) => (
                  <span key={user._id}>
                    {user.name}
                    {index < data.to.length - 1 && ", "}
                  </span>
                ))}
              </Typography>
            )}
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "#333",
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              fontSize: "1rem",
            }}
          >
            {data?.content}
          </Typography>

          {data?.link_url && (
            <Link
              href={
                data?.link_url?.startsWith("http")
                  ? data.link_url
                  : `https://${data.link_url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: 2,
                color: "#1976d2",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#1565c0",
                  textDecoration: "underline",
                },
              }}
            >
              View more details
              <Box
                component="span"
                sx={{
                  ml: 0.5,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Box>
            </Link>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationView;