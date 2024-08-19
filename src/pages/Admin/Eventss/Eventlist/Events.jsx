import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from '../../../../ui/StyledButton.jsx';
import StyledSearchbar from '../../../../ui/StyledSearchbar.jsx';
import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledTable from '../../../../ui/StyledTable.jsx';
import { eventColumns } from "../../../../assets/json/TableData.js";
import {getEvents,deleteEventById} from "../../../../api/events-api.js"
export default function Events() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const timeFormatter =(time) => {
    const date = new Date(time);
    const formattedTime =  date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedTime;
  }

 const handleDelete = async (eventId) =>{
  console.log('inside',eventId)
  const response = await deleteEventById(eventId);
 } 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        const formattedData = response.data.map(event => ({
          ...event,
          date: new Date(event.date).toDateString(),
          time: timeFormatter(event.time),
          activate: event.activate ? 'active' : 'inactive' 
        }));
        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleView = (id) => {
    navigate(`/events/eventlist/${id}`);
  };
  // const handleView2 = (id) => {
   
  //   navigate(`/members/addmember`);
  // };
  return (
    <>
       {" "}
    <Box padding="20px" marginBottom={4}>
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
          </Stack>
          <StyledTable
            columns={eventColumns}
            data={tableData}
            onSelectionChange={handleSelectionChange}
            onView={handleView}
            onDelete={handleDelete}
          />{" "}
        </>
      </Box>
      
    </>
  )
}
