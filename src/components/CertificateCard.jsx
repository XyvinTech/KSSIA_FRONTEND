import React from 'react'

import image from "../assets/images/certificate.png";
import { Box, Typography } from '@mui/material';
const CertificateCard = () => {
  return (
    <Box
          borderRadius={"8px"}
          bgcolor={"white"}
          width={"390px"}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <Box
            component="img"
            src={image}
            sx={{
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              width: "390px",
              height: "260px",
            }}
          />
          <Box borderRadius={"8px"} bgcolor={"white"} padding={"10px"}>
            <Typography
              variant="h5"
              color={"#333333"}
              textAlign={"center"}
              sx={{ marginBottom: "10px" }}
            >
              Honorary Certificate
            </Typography>
          </Box>
        </Box>
  )
}

export default CertificateCard
