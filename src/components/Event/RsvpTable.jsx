import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { StyledButton } from "../../ui/StyledButton";
import { generateExcel } from "../../utils/generateExcel";
import { getDwldRsvp } from "../../api/events-api";
import { useParams } from "react-router-dom";
const RsvpTable = ({ data }) => {
  const [formattedData, setFormattedData] = useState([]);
  const { id } = useParams();

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

  const handleDownload = async () => {
    try {
      const data = await getDwldRsvp(id);
      const csvData = data.data;
      if (csvData && csvData.headers && csvData.body) {
        generateExcel(csvData.headers, csvData.body,"Event");
      } else {
        console.error(
          "Error: Missing headers or data in the downloaded content"
        );
      }
    } catch (error) {
      console.error("Error downloading users:", error);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            name="Download"
            variant="primary"
            onClick={handleDownload}
          />
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
