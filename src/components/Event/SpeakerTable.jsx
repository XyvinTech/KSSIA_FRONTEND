import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
import StyledTable from "../../ui/StyledTable";
const SpeakerTable = ({ data }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const userColumns = [
    { title: "name", field: "speaker_name", padding: "none" },  
    { title: "designation", field: "speaker_designation" },
    { title: "image", field: "speaker_image" },
    { title: "role", field: "speaker_role" },

  ];
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={3}
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
        <StyledTable columns={userColumns} data={data} menu />{" "}
      </Box>
    </>
  );
};

export default SpeakerTable;
