import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useProductsStore } from "../store/productStore";
import { useApprovalStore } from "../store/approval-store";

const ReportPreview = ({ open, onClose, onChange, data }) => {
  const { patchProducts } = useProductsStore();
  const { patchApprovals } = useApprovalStore();
  const handleSubmit = async () => {
    try {
      const updateData = { status: "reported" };
      await patchProducts(data?.reportedElement?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleRequirementSubmit = async () => {
    try {
      const updateData = { status: "reported" };
      await patchApprovals(data?.reportedElement?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
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
        sx: { borderRadius: "12px", minWidth: 700 },
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
      <DialogContent sx={{ padding: 3 }}>
        <Stack spacing={3}>
          {data?.reportType === "user" ? null : (
           <Box
           sx={{
             borderRadius: "12px",
             overflow: "hidden",
             boxShadow: 3,
             maxHeight: "180px",
           }}
         >
           <img
             src={data?.reportedElement?.image}
             alt={data?.reportedElement?.name}
             style={{ width: "100%", height: "180px", objectFit: "cover" }}
           />
         </Box>
         
          )}

          <Stack spacing={1}>
            {data?.reportType === "user" ? (
              <Typography variant="h4" fontWeight={600} color={"#2C2829"}>
                {data?.reportedElement?.name?.first_name +
                  " " +
                  data?.reportedElement?.name?.middle_name +
                  " " +
                  data?.reportedElement?.name?.last_name}
              </Typography>
            ) : (
              <Typography variant="h4" fontWeight={600} color={"#2C2829"}>
                {data?.reportedElement?.name}
              </Typography>
            )}
            <Typography variant="h6" color={"#4A4647"}>
              Report Type: {data?.reportType}
            </Typography>{" "}
            {data?.reportType === "product" && (
              <>
                <Typography variant="body1" color={"#4A4647"}>
                  Price: ₹{data?.reportedElement?.price} &nbsp; (Offer Price: ₹
                  {data?.reportedElement?.offer_price})
                </Typography>
                <Typography variant="body2" color={"#4A4647"}>
                  Units: {data?.reportedElement?.units}
                </Typography>
                <Typography variant="body2" color={"#4A4647"}>
                  Description: {data?.reportedElement?.description}
                </Typography>{" "}
              </>
            )}
          </Stack>

          <Divider />
          <Box>
            <Typography variant="h6" fontWeight={600} color={"#2C2829"}>
              Reporter Details:
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar sx={{ bgcolor: "#E0F2F1", width: 56, height: 56 }}>
                  {data?.reportBy?.name?.first_name?.[0]}
                </Avatar>
              </Grid>
              <Grid item>
                <Stack spacing={0.5}>
                  <Typography variant="body1" fontWeight={500}>
                    {data?.reportBy?.name?.first_name}{" "}
                    {data?.reportBy?.name?.middle_name}{" "}
                    {data?.reportBy?.name?.last_name}
                  </Typography>
                  <Typography variant="body2" color={"#4A4647"}>
                    Company: {data?.reportBy?.company_name}
                  </Typography>
                  <Typography variant="body2" color={"#4A4647"}>
                    Phone: {data?.reportBy?.phone_numbers?.personal}
                  </Typography>
                  <Typography variant="body2" color={"#4A4647"}>
                    WhatsApp: {data?.reportBy?.phone_numbers?.whatsapp_number}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {data?.reportType === "product" && (
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={600} color={"#2C2829"}>
                Report Content:
              </Typography>
              <Typography variant="body1" color={"#4A4647"}>
                {data?.content}
              </Typography>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      {data?.reportType === "product" && (
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="primary"
            name={"Report"}
            onClick={handleSubmit}
          />
        </Stack>
      )}{" "}
      {data?.reportType === "requirement" && (
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="primary"
            name={"Report Requirement"}
            onClick={handleRequirementSubmit}
          />
        </Stack>
      )}
    </Dialog>
  );
};

export default ReportPreview;
