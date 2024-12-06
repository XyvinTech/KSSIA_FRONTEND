import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MembersPayments from "../../../components/MembersPayments";
import AppSubscriptionCard from "../../../ui/AppSubscriptionCard";
import MemberSubscriptionCard from "../../../ui/MemberSubscriptionCard";
import MembersProducts from "../../../components/MemberProducts";
import MembersRequirements from "../../../components/MemberRequirements";
import MemberAnalytics from "../../../components/MemberAnalytics";
import Review from "../../../components/Review";
import MemberProfile from "../../../components/MemberProfile";
import axiosInstance from "../../../api/axios-interceptor";
import CONSTANTS from "../../../constants";
import { useParams } from "react-router-dom";
import { usePaymentStore } from "../../../store/payment-store";
import styled from "styled-components";
import { useMemberStore } from "../../../store/member-store";
const StyledNoReviewsMessage = styled(Typography)`
  font-size: 1.2rem;
  color: #a0a0a0;
  font-weight: 500;
  text-align: center;
  margin-top: 16px;
`;

const ReviewContainer = styled(Grid)`
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  background-color: #f7f7f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;
const MembersSinglepage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [userData, setUserData] = useState({});
  const [isChange, setIsChange] = useState(false);
  const { id } = useParams();
  const {refreshMembers}=useMemberStore();
  const { fetchsubscriptionByUser, cards, refreshMember } = usePaymentStore();
  useEffect(() => {
    async function init() {
      const response = await axiosInstance.get(
        `${CONSTANTS.MEMBERS_API}/${id}`
      );
      if (response.status != 200) {
        return;
      }
      setUserData(response.data.data);
    }
    init();
  }, [id, isChange,refreshMembers]);
  const handleIsChange = () => {
    setIsChange(!isChange);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  useEffect(() => {
    fetchsubscriptionByUser(id);
    console.log("fetching");
  }, [refreshMember]);
  console.log("refreshMember", refreshMember);

  return (
    <>
      <Box
        padding={"20px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h4" color={"#4A4647"} textTransform={"capitalize"}>
          Members list /{userData?.abbreviation}  {' '}{userData?.name}
        </Typography>
      </Box>{" "}
      <Divider />
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
        <Tab label="Profile" />
        {/* <Tab label="Payments" /> */}
        {/* <Tab label="Subscriptions" /> */}
        <Tab label="Products" />
        <Tab label="Requirements" />
        <Tab label="Reviews" />
      </Tabs>
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
          <Grid spacing={2}>
            <MemberProfile data={userData} />
          </Grid>
        )}
       
        {/* {selectedTab === 2 && (
          <Grid container >
           
              {cards && cards?.length > 0 ? (
               <Stack direction={"column"} spacing={3}  >
                  {cards.some((p) => p.category === "app") && (
                    <AppSubscriptionCard
                      payment={cards.find((p) => p.category === "app")}
                    />
                  )}
                  {cards.some((p) => p.category === "membership") && (
                    <MemberSubscriptionCard
                      payment={cards.find((p) => p.category === "membership")}
                      onChange={handleIsChange}
                    />
                  )}
                </Stack>
              ) : (
                <ReviewContainer>
                  <Box width="100%" display="flex" justifyContent="center">
                    <StyledNoReviewsMessage>
                      No Subscription
                    </StyledNoReviewsMessage>
                  </Box>
                </ReviewContainer>
              )}
          </Grid>
        )} */}

        {selectedTab === 1 && (
          <Grid>
            <MembersProducts id={id} />
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid>
            <MembersRequirements id={id} />
          </Grid>
        )}
        {selectedTab === 3 && (
          <Grid container item xs={12}>
            {/* <Grid item xs={12}>
              <MemberAnalytics />
            </Grid> */}
            <Grid item xs={12} padding={2}>
              <Review data={userData?.reviews} />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default MembersSinglepage;
