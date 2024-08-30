import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DashboardRevnue from "../../components/DashboardRevnue";
import DashboardMembers from "../../components/DashboardMembers";
import DashboardEvents from "../../components/DashboardEvents";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
const DashboardPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  return (
    <>
      <Box
        padding={"10px"}
        bgcolor={"white"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h4" color={"#4A4647"}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center">
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
          </Grid>
        </Grid>
      </Box>

      <Grid>
        <Grid container spacing={1} item xs={12} >
          <Grid item xs={6}>
            <Box padding={2}>
              <DashboardRevnue />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box padding={2}>
              <DashboardMembers />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box padding={"20px"}>
          <DashboardEvents />
        </Box>
      </Grid>
    </>
  );
};

export default DashboardPage;
