import { Box, Typography } from "@mui/material";
import { is } from "date-fns/locale";
const QRProductCard = ({ product,isMobile }) => {
  return (
    <Box
      borderRadius={"12px"}
      bgcolor={"white"}
      width={isMobile ? "100%" : "185px"}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <Box
        component="img"
        src={product?.image}
        sx={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          width: isMobile ? "100%" : "185px",
          height: isMobile ? "120px" : "185px",
          objectFit: "contain",
        }}
      />
      <Box borderRadius={"12px"} bgcolor={"white"} padding={"10px"}>
        <Typography
          variant="h6"
          color={"rgba(51, 51, 51, 1)"}
          sx={{ marginBottom: "10px" }}
        >
          {product?.name}
        </Typography>
        <Typography
          variant="h5"
          color={"#004797"}
          sx={{ marginBottom: "10px" }}
        >
          <Typography
            component="span"
            variant="h5"
            color={"rgba(51, 51, 51, 1)"}
            sx={{ textDecoration: "line-through", marginRight: "8px" }}
          >
            ₹{product?.price}
          </Typography>
          ₹{product?.offer_price}
        </Typography>
        <Typography
          sx={{ marginBottom: "10px" }}
          color={"#6D6D6D"}
          variant="h7"
        >
          MOQ: {product?.moq}
        </Typography>
      </Box>
    </Box>
  );
};

export default QRProductCard;
