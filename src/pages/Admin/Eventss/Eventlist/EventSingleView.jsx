import React, { useState } from "react";
import { StyledButton } from "../../../../ui/StyledButton";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import SpeakerTable from "../../../../components/Event/SpeakerTable";
import RsvpTable from "../../../../components/Event/RsvpTable";
import OrganizerCard from "../../../../components/Event/OrganizerCard";
import EventCard from "../../../../components/Event/EventCard";
import imag from "../../../../assets/images/Event.png";
import Postpone from "../../../../components/Event/Postpone";
import CancelEvent from "../../../../components/Event/CancelEvent";
const EventSingleView = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [postponeOpen, setPostponeOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handlePostpone = () => {
    setPostponeOpen(true);
  };
  const handleClosePostpone = () => {
    setPostponeOpen(false);
  };
  const handleCancel = () => {
    setCancelOpen(true);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
  };
  const data = {
    date: "27 July 2024, 12:00 pm",
    address: "123,cross ,Lorel ipsumLorel ipsum,567788",
    img: imag,
  };
  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"#4A4647"}>
              Events / Event Name
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <StyledButton
                name="Cancel"
                variant="secondary"
                onClick={handleCancel}
              />
            </Grid>
            <Grid item>
              <StyledButton
                name="Postpone"
                variant="primary"
                onClick={handlePostpone}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>{" "}
      <Box padding="30px" marginBottom={4}>
        <Grid container alignItems="center" spacing={4}>
          <Grid item md={6}>
            <EventCard user={data} />
          </Grid>
          <Grid item md={4}>
            <OrganizerCard />
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={4}>
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
            paddingTop: "4px",
            "& .MuiTabs-indicator": {
              backgroundColor: "#004797",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              margin: "0 30px",
            },
            "& .Mui-selected": {
              color: "#004797",
            },
          }}
        >
          <Tab label="Speaker List" />
          <Tab label="RSVP list" />
        </Tabs>
      </Box>{" "}
      <Box padding="30px" paddingTop={0} marginBottom={4}>
        {selectedTab === 0 && (
          <Grid>
            <SpeakerTable />
          </Grid>
        )}{" "}
        {selectedTab === 1 && (
          <Grid>
            <RsvpTable />
          </Grid>
        )}
      </Box>{" "}
      <Postpone
        open={postponeOpen}
        onClose={handleClosePostpone}
        onChange={handleChange}
      />
      <CancelEvent
        open={cancelOpen}
        onClose={handleCloseCancel}
        onChange={handleChange}
      />
    </>
  );
};

export default EventSingleView;