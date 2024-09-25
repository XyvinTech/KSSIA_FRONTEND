import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../../ui/StyledButton";
import {
  Box,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SpeakerTable from "../../../../components/Event/SpeakerTable";
import RsvpTable from "../../../../components/Event/RsvpTable";
import OrganizerCard from "../../../../components/Event/OrganizerCard";
import EventCard from "../../../../components/Event/EventCard";
import Postpone from "../../../../components/Event/Postpone";
import CancelEvent from "../../../../components/Event/CancelEvent";
import { useParams } from "react-router-dom";
import { useEventStore } from "../../../../store/event-store";
const EventSingleView = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [postponeOpen, setPostponeOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { events, fetchEventById, loadings } = useEventStore();
  const [isChange, setIsChange] = useState(false);
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  useEffect(() => {
    fetchEventById(id);
  }, [isChange]);
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
  const handleIsChange = () => {
    setIsChange(!isChange);
  };

  return (
    <>
      {loadings ? (
        <LinearProgress />
      ) : (
        <>
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
                  Events /{events?.name}
                </Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
                {events?.status !== "cancelled" && (
                  <>
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
                  </>
                )}
              </Grid>
            </Grid>
          </Box>{" "}
          <Box padding="30px" marginBottom={4}>
            <Grid container alignItems="center" spacing={4}>
              <Grid item md={6}>
                <EventCard user={events} />
              </Grid>
              <Grid item md={4}>
                <OrganizerCard data={events} />
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
          <Box padding="15px" paddingTop={0} marginBottom={4}>
            {selectedTab === 0 && (
              <Grid>
                <SpeakerTable data={events?.speakers} />
              </Grid>
            )}{" "}
            {selectedTab === 1 && (
              <Grid>
                <RsvpTable data={events?.rsvp} />
              </Grid>
            )}
          </Box>{" "}
          <Postpone
            open={postponeOpen}
            onClose={handleClosePostpone}
            onChange={handleIsChange}
            data={events}
          />
          <CancelEvent
            open={cancelOpen}
            onClose={handleCloseCancel}
            onChange={handleIsChange}
            id={events?._id}
          />{" "}
        </>
      )}
    </>
  );
};

export default EventSingleView;
