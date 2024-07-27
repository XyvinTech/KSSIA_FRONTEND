import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import SingleAddform from "../../../components/SingleAddform.jsx"
import BulkAddform from "../../../components/BulkAddform";
import EmailNotificationform from "../../../components/EmailNotificationform.jsx";
import InappNotificationform from "../../../components/InappNotificationform.jsx";
import NotificationLogs from "../../../components/NotificationLogs.jsx";
import AdminManagement from "./AdminManagement.jsx";
import RoleManagement from "./RoleManagement.jsx";
import AdminActivity from "./AdminActivity.jsx";





const SettingsPage= () => {
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
          paddingTop: "34px",
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
        <Tab label="Admin mangement" />
        <Tab label="Role management" />
        <Tab label="Admin activity" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
            <Grid container>
            <Grid item md={12}>
            <AdminManagement/>
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container>
            <Grid item md={12}>
            <RoleManagement/>
            </Grid>
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid container>
            <Grid item md={12}>
            <AdminActivity/>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default SettingsPage;