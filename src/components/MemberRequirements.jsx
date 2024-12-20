import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import { useApprovalStore } from "../store/approval-store";

export default function MembersRequirements({ id }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { approvalByUser, fetchApprovalByUser, totalCount } =
    useApprovalStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchApprovalByUser(id, filter);
  }, [pageNo, row]);
  const userColumns = [
    { title: "date", field: "createdAt", padding: "none" },
    { title: "image", field: "image" },
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
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
          
          </Stack>
        </Stack>{" "}
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={userColumns}
            rowPerSize={row}
            setRowPerSize={setRow}
            data={approvalByUser}
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalCount={totalCount}
            menu
          />{" "}
        </Box>
      </>
    </>
  );
}
