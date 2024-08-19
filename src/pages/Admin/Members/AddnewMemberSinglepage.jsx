import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import SingleAddform from "../../../components/SingleAddform.jsx"
import BulkAddform from "../../../components/BulkAddform";





const AddnewMemberSinglepage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  return (
    <>
      <Box padding={"10px"}height={'70px'}display={'flex'}alignItems={'center'}bgcolor={"#FFFFFF"}>
      <Grid container alignItems="center">
      <Grid item xs={6} spacing={2}>
        <Typography variant="h4" color={"#4A4647"}>
          Members List / Add new Member
        </Typography></Grid>  </Grid>
      </Box>{" "}  
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#004797",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          // bgcolor: "white",
          paddingTop: "4px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#004797",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize:'16px', 
            fontWeight: 600,
          },
          "& .Mui-selected": {
            color: "#004797",
          },
        }}
      >
        <Tab label="Single Add" />
        <Tab label="Bulk Add" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
             <Grid spacing={2}>
             <SingleAddform/>
           </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container>
            <Grid item md={6}>
            <BulkAddform/>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default AddnewMemberSinglepage;