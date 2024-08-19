import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import { userColumns, userData } from "../assets/json/TableData";
import { StyledButton } from "../ui/StyledButton";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import RejectionEntryForm from "./Members/RejectionEntryForm";

export default function MembersPayments() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleApprove = (id) => {
    console.log("View item:", id);
  };
  const handleReject = (id) => {
    setRejectOpen(true);
  };
  const handleCloseReject = (id) => {
    setRejectOpen(false);
  };
  return (
    <>
      {" "}
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={3}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <Stack>
              <StyledSearchbar />
            </Stack>
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
            <Stack>
              <StyledButton name="Download" variant="third">
                Download
              </StyledButton>
            </Stack>
          </Stack>
        </Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={userColumns}
            data={userData}
            onSelectionChange={handleSelectionChange}
            onModify={handleApprove}
            onAction={handleReject}
            payment
          />{" "}
          <RejectionEntryForm
            open={rejectOpen}
            onClose={handleCloseReject}
            onChange={handleChange}
          />
        </Box>
      </>
    </>
  );
}
