import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import { userColumns, userData } from "../assets/json/TableData";
import { StyledButton } from '../ui/StyledButton';
import StyledSearchbar from '../ui/StyledSearchbar';
import StyledTable from '../ui/StyledTable';


export default function MembersRequirements() {
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  
  const handleView = (id) => {
    console.log("View item:", id);
  };
  return (
    <>
       {" "}
      
    <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
              <Stack>
              <StyledSearchbar /></Stack>
              <Stack>
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
           
            </Stack>
          </Stack>
          <StyledTable
            columns={userColumns}
            data={userData}
            onSelectionChange={handleSelectionChange}
            onView={handleView}
          />{" "}
        </>
      </Box>
      
    </>
  )
}
