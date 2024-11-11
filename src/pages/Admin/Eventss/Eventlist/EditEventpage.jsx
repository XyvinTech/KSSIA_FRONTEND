import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddEvent from '../../../../components/AddEvent.jsx';

export default function EditEventpage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const { id } = useParams();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  // const handleView = (id) => {
  //   console.log("View item:", id);
  //   navigate(`/members/member/${id}`);
  // };

  return (
    <>
       {" "}
       <Box padding={"10px"} bgcolor={"#FFFFFF"}>
      <Grid container alignItems="center"display={"flex"} justifyContent={"start"}height={"40px"}>
        <Grid item xs={6} >
          <Typography variant="h4" color={"#4A4647"}>
           Events / Edit event
          </Typography>
        </Grid>
       
      </Grid>
    </Box>
    <Grid container item xs={12}>
      <Grid item xs={10} padding={'15px'}>
       <AddEvent
        eventId = {id}
       />

      </Grid>
    </Grid>
      
    </>
  )
}
