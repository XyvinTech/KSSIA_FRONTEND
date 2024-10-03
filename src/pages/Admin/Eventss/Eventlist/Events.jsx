import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../../ui/StyledButton.jsx";
import StyledSearchbar from "../../../../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../../ui/StyledTable.jsx";
import { eventColumns } from "../../../../assets/json/TableData.js";
import { getEvents, deleteEventById } from "../../../../api/events-api.js";
import { toast } from "react-toastify";

export default function Events() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteEventById(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteEventById(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let filter = {};
        if (search) {
          filter.search = search;
        }
        filter.pageNo = pageNo;

        const response = await getEvents(filter);
        setTableData(response.data);
        setTotal(response.totalCount);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [isChange, pageNo,search]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleEdit = (id) => {
    navigate(`/events/eventlist/${id}`);
  };
  const handleView = (id) => {
    navigate(`/events/${id}`);
  };
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
          <StyledSearchbar
                placeholder={"Search events"}
                onchange={(e) => setSearch(e.target.value)}
              />
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
            columns={eventColumns}
            data={tableData}
            onSelectionChange={handleSelectionChange}
            onModify={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            totalCount={total}
            pageNo={pageNo}
            setPageNo={setPageNo}
            onDeleteRow={handleRowDelete}
          />{" "}
        </Box>
      </>
    </>
  );
}
