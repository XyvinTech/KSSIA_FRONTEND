import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import SingleAddform from "../../../components/SingleAddform.jsx";
import BulkAddform from "../../../components/BulkAddform";
import EmailNotificationform from "../../../components/EmailNotificationform.jsx";
import InappNotificationform from "../../../components/InappNotificationform.jsx";
import NewsAddnewform from "../../../components/NewsAddnewform.jsx";
import NewsAllpage from "./NewsAllpage.jsx";

const Newspage = () => {
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
            fontSize: "16px",
            fontWeight: 600,
            margin: "0 60px",
          },
          "& .Mui-selected": {
            color: "#004797",
          },
        }}
      >
        <Tab label="All" />
        <Tab label="Add new" />
      </Tabs>
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
          <Grid container>
            <Grid item md={12}>
              <NewsAllpage />
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container>
            <Grid item md={7}>
              <NewsAddnewform setSelectedTab={setSelectedTab} />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Newspage;
