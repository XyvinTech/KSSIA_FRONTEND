import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
import StyledTable from "../../ui/StyledTable";
const RsvpTable = ({ data }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [formattedData, setFormattedData] = useState([]);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  useEffect(() => {
    const transformedData = data.map((item) => ({
      full_name: `${item.name}`,
      phone_number: item.phone_numbers.personal,
      company_name: item.company_name,
    }));

    setFormattedData(transformedData);
  }, [data]);

  const userColumns = [
    { title: "Full Name", field: "full_name" },
    { title: "Phone Number", field: "phone_number" },
    { title: "Company Name", field: "company_name" },
  ];

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  console.log(data);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar />
          <Box
            bgcolor={"#FFFFFF"}
            borderRadius={"50%"}
            width={"48px"}
            height={"48px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(0, 0, 0, 0.12)"
            onClick={handleOpenFilter}
            style={{ cursor: "pointer" }}
          >
            <FilterIcon />
          </Box>
        </Stack>
      </Stack>{" "}
      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        <StyledTable columns={userColumns} data={formattedData} menu />{" "}
      </Box>
    </>
  );
};

export default RsvpTable;
