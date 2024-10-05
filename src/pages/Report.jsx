import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StyledSearchbar from "../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import { useApprovalStore } from "../store/approval-store";
import StyledTable from "../ui/StyledTable";
import { useReportStore } from "../store/reportStore";
import { toast } from "react-toastify";
import ReportPreview from "../components/ReportPreview";
export default function Report() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const {
    reports,
    fetchReport,
    totalCount,
    deleteReports,
    report,
    fetchReportById,
  } = useReportStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  useEffect(() => {
    let filter = {};
    filter.page = pageNo;
    if (search) {
      filter.search = search;
    }
    fetchReport(filter);
  }, [isChange, pageNo,search]);
  const formattedReports = reports.map((report) => ({
    ...report,
    reportBy: `${report?.reportBy?.name?.first_name} ${
      report?.reportBy?.name?.middle_name
        ? report?.reportBy?.name?.middle_name + " "
        : ""
    }${report?.reportBy?.name?.last_name}`,
  }));
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteReports(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteReports(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
  const userColumns = [
    { title: "Date", field: "createdAt", padding: "none" },
    { title: "Report By", field: "reportBy" },
    { title: "Type", field: "reportType" },
    { title: "Description", field: "content" },
  ];
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
  const handlePreview = async (id) => {
    await fetchReportById(id);
    setPreviewOpen(true);
  };
  const handleClosePreview = () => {
    setPreviewOpen(false);
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
              <StyledSearchbar placeholder={"Search"}onchange={(e)=>{setSearch(e.target.value)}} />
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
              data={formattedReports}
              onSelectionChange={handleSelectionChange}
              report
              onDelete={handleDelete}
              onDeleteRow={handleRowDelete}
              totalCount={totalCount}
              pageNo={pageNo}
              onAction={handlePreview}
              setPageNo={setPageNo}
            />{" "}
            <ReportPreview
              open={previewOpen}
              onClose={handleClosePreview}
              onChange={handleChange}
              data={report}
            />
          </Box>
        </>
      </Box>
    </>
  );
}
