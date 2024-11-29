import React from "react";

import { Box, Typography } from "@mui/material";
const QRAwardCard = ({ award, ismobile }) => {
  return (
    <Box
      borderRadius={"12px"}
      bgcolor={"white"}
      width={ismobile ? "100%" : "260px"}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <Box
        component="img"
        src={award?.url}
        sx={{
          borderTopLeftRadius: "12px",
          objectFit: "cover",
          borderTopRightRadius: "12px",
          width: ismobile ? "100%" : "460px",
          height: ismobile ? "131px" : "178px",
        }}
      />
      <Box borderRadius={"8px"} bgcolor={"white"} padding={"10px"}>
        <Typography
          variant="h5"
          color={"#333333"}
          textAlign={"start"}
          sx={{ marginBottom: "10px" }}
        >
          {award?.name}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={400}
          color={"#757575"}
          textAlign={"start"}
          sx={{ marginBottom: "10px" }}
        >
          {award?.authority_name}
        </Typography>
      </Box>
    </Box>
  );
};

export default QRAwardCard;
