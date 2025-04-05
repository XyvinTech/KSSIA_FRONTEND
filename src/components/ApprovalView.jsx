import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import moment from "moment";

const ApprovalView = ({ open, onClose, data }) => {
  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color={"#4F4F4F"}>
            Requirement Detail
          </Typography>
          <Typography
            onClick={(event) => handleClose(event)}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Box>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        {data && (
          <Box>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "#E71D36",
                  color: "#fff",
                  mr: 2,
                }}
              >
                {data?.author?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {data.author?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Membership ID: {data?.author?.membership_id}
                </Typography>
              </Box>
              <Box ml="auto">
                <Chip
                  label={data.status}
                  color={data.status === "approved" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Box>
            {data?.image && (
              <Box mb={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <img
                  src={data?.image}
                  alt="Content"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}

            <Box
              p={2}
              mb={2}
              sx={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="body1">{data?.content}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Typography variant="caption" color="text.secondary">
               Created on {moment(data.createdAt).format("DD-MM-YYYY")}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalView;
