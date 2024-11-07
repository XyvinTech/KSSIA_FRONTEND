import React, { useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ReactComponent as IncreaseIcon } from "../../assets/icons/IncreaseIcon.svg";
import { ReactComponent as GreenIcon } from "../../assets/icons/IncreaseGreenIcon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const RevenueCard = ({ isMobile, data, isDate, spacing,height }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
        {isDate && (
          <Stack>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMM, yyyy"
              showMonthYearPicker
              customInput={
                <Typography
                  fontWeight={400}
                  fontSize={isMobile ? "12px" : "14px"}
                  color="rgba(0, 0, 0, 0.6)"
                >
                  {moment(selectedDate).format("MMM, YYYY")}
                  <IconButton size="small" sx={{ padding: 0, color: "blue" }}>
                    <ArrowDropDownIcon fontSize="small" />
                  </IconButton>
                </Typography>
              }
            />
          </Stack>
        )}
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography fontWeight={700} fontSize={isMobile ? "24px" : "45px"}>
          {data?.amount}
        </Typography>
        {data?.percentage && (
          <Typography
            color={
              isMobile ? "rgba(27, 210, 17, 0.98)" : "rgba(9, 63, 179, 0.5)"
            }
            fontSize={isMobile ? "12px" : "16px"}
            fontWeight={400}
          >
            {isMobile ? <GreenIcon /> : <IncreaseIcon />} {data?.percentage}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
