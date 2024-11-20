import React from "react";
import { Stack, Typography } from "@mui/material";

export const RevenueCard = ({ isMobile, data, spacing, height }) => {
  return (
    <Stack
      bgcolor={"white"}
      borderRadius={"10px"}
      padding={spacing ? "25px" : "15px"}
      spacing={spacing ? 18 : 2}
      justifyContent={"space-between"}
      border={"1px solid rgba(0, 0, 0, 0.25)"}
      height={height}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Stack spacing={1}>
          {data?.icon && <data.icon />}

          <Typography fontWeight={400} fontSize={isMobile ? "12px" : "14px"}>
            {data?.title}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography fontWeight={700} fontSize={isMobile ? "24px" : "45px"}>
          {data?.amount !== null && data?.amount !== undefined
            ? data.amount
            : "_"}
        </Typography>
      </Stack>
    </Stack>
  );
};
