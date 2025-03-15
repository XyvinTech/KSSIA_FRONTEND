import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import SingleAddform from "../../../components/SingleAddform.jsx"
import BulkAddform from "../../../components/BulkAddform";
import Promotionform from "../../../components/Promotionform.jsx";
import PromotionListempty from "../../../components/PromotionListempty.jsx";





const CreatepromotionSinglepage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    // console.log("Selected items:", newSelectedIds);
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
          paddingTop: "20px",
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
      
        <Tab label="Create a promotion" />
      </Tabs>
      <Box padding="15px" marginBottom={4}>
     
        {selectedTab === 0 && (
          <Grid container>
            <Grid item md={8}>
            <Promotionform/>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default CreatepromotionSinglepage;