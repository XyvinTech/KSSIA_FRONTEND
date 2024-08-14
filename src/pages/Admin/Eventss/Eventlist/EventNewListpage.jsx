import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";


import Events from "./Events";
import AddEvent from "../../../../components/AddEvent";





const EventNewListpage = () => {
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
          bgcolor: "white",
          paddingTop: "24px",
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
        <Tab label="Events" />
        <Tab label="Add Events" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
             <Grid spacing={2}>
             <Events/>
           </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container>
            <Grid item md={8}>
            <AddEvent/>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default EventNewListpage;