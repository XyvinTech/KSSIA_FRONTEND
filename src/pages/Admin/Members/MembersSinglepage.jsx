import { Box, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
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




const MembersSinglepage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [userData ,setUserData] = useState({})
  const { id } = useParams()
  
  useEffect(()=>{
    async function init(){

      const response = await axiosInstance.get(`${CONSTANTS.MEMBERS_API}/${id}`)
      if(response.status != 200) {
        // handle error
        return
      }
      setUserData(response.data.data);
    }
    init()
  },[id])
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  return (
    <>
      <Box padding={"20px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Members list / {userData.name}
        </Typography>
      </Box>{" "}
      <Divider/>
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
            margin: '0 30px',
          },
          "& .Mui-selected": {
            color: "#004797",
          },
        }}
      >
        <Tab label="Profile" />
        <Tab label="Payments" />
        <Tab label="Subscriptions" />
        <Tab label="Products" />
        <Tab label="Requirements" />
        <Tab label="Analytics" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
             <Grid spacing={2}>
             <MemberProfile data={userData}/>
           </Grid>
        )}
        {selectedTab === 1 && (
          <Grid>
            <MembersPayments/>
          </Grid>
        )}
        {selectedTab === 2 && (
         <Grid container>
            <Stack direction={"column"} spacing={3}>
                <AppSubscriptionCard/>
                <MemberSubscriptionCard/>
                </Stack>
         </Grid>
        )}
        {selectedTab === 3 && (
          <Grid>
          <MembersProducts/>
        </Grid>
        )}
        {selectedTab === 4 && (
           <Grid>
           <MembersRequirements/>
         </Grid>
        )}
        {selectedTab === 5 && (
          
           <Grid container item xs={12}>
            <Grid item xs={12}>
          <MemberAnalytics/>
          </Grid>
          <Grid item xs={12} marginTop={4}>
          <Review/>
          </Grid>
          </Grid>
          
        
          
        
        )}
      </Box>
    </>
  );
};

export default MembersSinglepage;
