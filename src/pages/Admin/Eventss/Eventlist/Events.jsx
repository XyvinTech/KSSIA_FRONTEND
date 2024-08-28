import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../../ui/StyledButton.jsx";
import StyledSearchbar from "../../../../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../../ui/StyledTable.jsx";
import { eventColumns } from "../../../../assets/json/TableData.js";
import { getEvents, deleteEventById } from "../../../../api/events-api.js";

export default function Events() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
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
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteEventById(id);
    setIsChange(!isChange);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        // const formattedData = response.data.map((event) => ({
        //   ...event,
        //   date: new Date(event.date).toDateString(),
        //   time: timeFormatter(event.time),
        //   activate: event.activate ? "active" : "inactive",
        // }));
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [isChange]);
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
          <StyledTable
            columns={eventColumns}
            data={tableData}
            onSelectionChange={handleSelectionChange}
            onModify={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            onDeleteRow={handleRowDelete}
          />{" "}
        </Box>
      </>
    </>
  );
}
