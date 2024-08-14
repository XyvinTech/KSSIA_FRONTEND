import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton.jsx";
import StyledSearchbar from "../../../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable.jsx";
import { userColumns, userData } from "../../../assets/json/TableData";
export default function RoleManagement() {
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
    navigate(`/settings/addrole`);
  };
  return (
    <>
      {" "}
      <>
        <Grid container alignItems="center">
          <Grid item xs={6}></Grid>
          <Grid item xs={6} container display={'flex'} alignItems={'center'} justifyContent="flex-end" spacing={2}>
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
              <StyledButton
                name="Add role"
                variant="primary"
                onClick={handleView2}
              >
                Add role
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid marginTop={4}>
          {" "}
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable
              columns={userColumns}
              data={userData}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
            />{" "}
          </Box>
        </Grid>
      </>
    </>
  );
}
