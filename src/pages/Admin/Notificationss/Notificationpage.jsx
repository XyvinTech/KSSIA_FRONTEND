import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import EmailNotificationform from "../../../components/EmailNotificationform.jsx";
import InappNotificationform from "../../../components/InappNotificationform.jsx";
import NotificationLogs from "../../../components/NotificationLogs.jsx";





const Notificationpage = () => {
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
        <Tab label="E-mail Notifcations" />
        <Tab label="In-app Notifications" />
        <Tab label="Notification logs" />
      </Tabs>
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
            <Grid container>
            <Grid item md={7}>
            <EmailNotificationform setSelectedTab={setSelectedTab}/>
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container>
            <Grid item md={7}>
            <InappNotificationform setSelectedTab={setSelectedTab}/>
            </Grid>
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid container>
            <Grid item md={12}>
            <NotificationLogs/>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Notificationpage;