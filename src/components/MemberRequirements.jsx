import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import { userColumns, userData } from "../assets/json/TableData";
import { StyledButton } from "../ui/StyledButton";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import { useApprovalStore } from "../store/approval-store";

export default function MembersRequirements({ id }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const { approvals, fetchApprovalByUser } = useApprovalStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  useEffect(() => {
    fetchApprovalByUser(id);
  }, []);
  const userColumns = [
    { title: "date", field: "createdAt", padding: "none" },
    { title: "image", field: "image" },
    { title: "description", field: "content" },
    ,
    { title: "Status", field: "status" },
  ];
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
          </Stack>
        </Stack>{" "}
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable columns={userColumns} data={approvals} menu />{" "}
        </Box>
      </>
    </>
  );
}
