import { Box, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledBannerTables from "../ui/StyledBannerTables";
import StyledVideoTable from "../ui/StyledVideoTable";
import StyledPosterTable from "../ui/StyledPosterTable";
import StyledNoticeTable from "../ui/StyledNoticeTable";





const PromotionItems = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    // console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    // console.log("View item:", id);
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
          
          paddingTop: "10px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#004797",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize:'16px', 
            fontWeight: 600,
            margin: '0 30px',
          },
          "& .Mui-selected": {
            color: "#004797",
          },
        }}
      >
        <Tab label="Banner" />
        <Tab label="Video" />
        <Tab label="Poster" />
        <Tab label="Notice" />
      </Tabs>
      <Divider/>
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
             <Grid>
             <StyledBannerTables/>
           </Grid>
        )}
        {selectedTab === 1 && (
          <Grid>
           <StyledVideoTable/>
          </Grid>
        )}
        {selectedTab === 2 && (
         <Grid>
           <StyledPosterTable/>
         </Grid>
        )}
        {selectedTab === 3 && (
          <Grid>
          <StyledNoticeTable/>
        </Grid>
        )}
       
      </Box>
    </>
  );
};

export default PromotionItems;
