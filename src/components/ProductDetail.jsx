import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
import { useProductsStore } from "../store/productStore";

const ProductDetail = ({ open, onClose, onChange, data, onDeny }) => {
  const { handleSubmit } = useForm();
  const { patchProducts } = useProductsStore();

  const onSubmit = async () => {
    try {
      const updateData = { status: "accepted" };
      await patchProducts(data?._id, updateData);
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    onDeny(data?._id);
    onClose();
  };

  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "#4CAF50";
      case "pending":
        return "#FF9800";
      default:
        return "#F44336";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "8px",width: "480px" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="500">
              Product Details
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              edge="end"
              sx={{ color: "#E71D36" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: "flex", p: 2 }}>
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "4px",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid #eee",
              }}
            >
              <img
                src={data?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt={data?.name || "Product"}
              />
            </Box>

            <Box sx={{ ml: 2, flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="500">
                {data?.name || "Product Name"}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {data?.category || "Category"}
                </Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1,
                    py: 0.5,
                    ml: 1,
                    borderRadius: "4px",
                    backgroundColor: getStatusColor(data?.status),
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                >
                  {data?.status?.toUpperCase() || "PENDING"}
                </Box>
              </Box>

              <Box sx={{ display: "flex", mt: 1 }}>
                <Typography variant="body2" fontWeight="bold" color="#E71D36">
                ₹{data?.offer_price || 0}
                </Typography>
                {data?.price && data.price !== data.offer_price && (
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, textDecoration: "line-through" }}
                    color="text.secondary"
                  >
                    ₹{data?.price}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  {data?.units || 0} units
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Seller:
            </Typography>
            <Typography variant="body1">
              {data?.seller_id?.name || "Unknown Seller"} (ID:{" "}
              {data?.seller_id?.membership_id || "N/A"})
            </Typography>
          </Box>

          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Description:
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {data?.description || "No description available."}
            </Typography>
          </Box>

          {data?.subcategory && data.subcategory.length > 0 && (
            <>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Subcategories:
                </Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}
                >
                  {data.subcategory.map((sub, index) => (
                    <Box
                      key={index}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "16px",
                        backgroundColor: "#f0f0f0",
                        fontSize: "0.75rem",
                      }}
                    >
                      {sub}
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          <Divider />
          <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Added on:{" "}
              {new Date(data?.createdAt).toLocaleDateString() || "N/A"}
            </Typography>
          </Box>
        </DialogContent>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, gap: 1 }}>
          <StyledButton
            variant="secondary"
            name="Deny"
            onClick={(event) => handleClear(event)}
          />
          {data?.status !== "accepted" && (
            <StyledButton variant="primary" name="Approve" type="submit" />
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default ProductDetail;
