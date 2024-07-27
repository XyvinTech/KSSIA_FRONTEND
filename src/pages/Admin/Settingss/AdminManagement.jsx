import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from '../../../ui/StyledButton.jsx';
import StyledSearchbar from '../../../ui/StyledSearchbar.jsx';
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from '../../../ui/StyledTable.jsx';
import { userColumns, userData } from "../../../assets/json/TableData";
export default function AdminManagement() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  const handleView = (id) => {
    console.log("View item:", id);
    navigate(`/events/eventlist/:id`);
  };
  const handleView2 = (id) => {
   
    navigate(`/settings/addnewadmin`);
  };
  return (
    <>
       {" "}
    <Box padding="20px" marginBottom={4} >
        <>
        <Grid container alignItems="center">
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
          <Grid item>
          <StyledSearchbar />
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
          <StyledButton name="Add new admin" variant="primary" onClick={handleView2}>
              Add new admin
           </StyledButton>
          </Grid>
        </Grid>
      </Grid>
         
        <Grid marginTop={4}>
          <StyledTable
            columns={userColumns}
            data={userData}
            onSelectionChange={handleSelectionChange}   
            onView={handleView}
          />{" "}
          </Grid>
        </>
      </Box>
      
    </>
  )
}
