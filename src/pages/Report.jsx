import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StyledSearchbar from "../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import { useApprovalStore } from "../store/approval-store";
import StyledTable from "../ui/StyledTable";
import { useReportStore } from "../store/reportStore";
export default function Report() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { reports, fetchReport, totalCount } = useReportStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  useEffect(() => {
    fetchReport();
  }, []);

  const userColumns = [
    { title: "Date", field: "createdAt", padding: "none" },
    { title: "Report By", field: "reportBy" },
    { title: "Type", field: "reportType" },
    { title: "Description", field: "content" },
    
    
  ];
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
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
              Report
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
              data={reports}
              onSelectionChange={handleSelectionChange}
              menu
              totalCount={totalCount}
              pageNo={pageNo}
              setPageNo={setPageNo}
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
}
