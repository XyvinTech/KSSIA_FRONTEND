

import { Box, Typography } from "@mui/material";
import image from "../assets/images/Card1.png";
const ProductCard = ({ product }) => {
  return (
    <Box
      borderRadius={"12px"}
      bgcolor={"white"}
      width={'185px'}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <Box
        component="img"
        src={image}
        sx={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          width: "185px",
        }}
      />
      <Box borderRadius={"12px"} bgcolor={"white"} padding={"10px"}>
        <Typography
          variant="h6"
          color={"rgba(51, 51, 51, 1)"}
          sx={{ marginBottom: "10px" }}
        >
          {product.title}
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
            {product.originalPrice}
          </Typography>
          {product.discountedPrice}
        </Typography>
        <Typography
          sx={{ marginBottom: "10px" }}
          color={"#6D6D6D"}
          variant="h7"
        >
          {product.moq}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
