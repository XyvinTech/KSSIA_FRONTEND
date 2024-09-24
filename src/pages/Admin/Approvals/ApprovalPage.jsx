import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import RequirementDetail from "../../../components/RequirementDetail";
import { useApprovalStore } from "../../../store/approval-store";
import ApproveReject from "../../../components/ApproveReject";
export default function ApprovalPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { approvals, fetchApproval, fetchApprovalById, totalCount, approval } =
    useApprovalStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  useEffect(() => {
    fetchApproval();
  }, [isChange]);
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const userColumns = [
    { title: "Date", field: "createdAt", padding: "none" },
    { title: "Image", field: "image" },
    { title: "Description", field: "content" },
    ,
    { title: "Status", field: "status" },
  ];
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleApprove = async (id) => {
    await fetchApprovalById(id);
    setApproveOpen(true);
  };
  const handleCloseApprove = () => {
    setApproveOpen(false);
  };
  const handleReject = async (id) => {
    await fetchApprovalById(id);
    setRejectOpen(true);
  };
  const handleCloseReject = (id) => {
    setRejectOpen(false);
  };

  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"#4A4647"}>
              Requirement list
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box padding="15px" marginBottom={4}>
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
            <StyledTable
              columns={userColumns}
              data={approvals}
              onSelectionChange={handleSelectionChange}
              onModify={handleApprove}
              payment
              onAction={handleReject}
              totalCount={totalCount}
              pageNo={pageNo}
              setPageNo={setPageNo}
            />{" "}
            <ApproveReject
              open={rejectOpen}
              onClose={handleCloseReject}
              data={approval}
              onChange={handleChange}
            />
            <RequirementDetail
              open={approveOpen}
              onClose={handleCloseApprove}
              data={approval}
              onChange={handleChange}
              onDeny={handleReject}
            />
          </Box>
        </>
      </Box>
    </>
  );
}
