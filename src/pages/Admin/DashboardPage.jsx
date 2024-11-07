import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as RevenueIcon } from "../../assets/icons/RevenueIcon.svg";
import { ReactComponent as MembershipRevenueIcon } from "../../assets/icons/MembershipRevenueIcon.svg";
import { ReactComponent as AppRevenueIcon } from "../../assets/icons/AppRevenueIcon.svg";
import { ReactComponent as TotalProductIcon } from "../../assets/icons/TotalProductIcon.svg";
import { ReactComponent as TotalRequirementIcon } from "../../assets/icons/TotalRequirementIcon.svg";
import { ReactComponent as TotalMemberIcon } from "../../assets/icons/TotalMemberIcon.svg";
import { ReactComponent as ActiveMemberIcon } from "../../assets/icons/ActiveMemberIcon.svg";
import { ReactComponent as PremiumIcon } from "../../assets/icons/PremiumIcon.svg";
import { ReactComponent as FrozenIcon } from "../../assets/icons/FrozenIcon.svg";
import { ReactComponent as EventsIcon } from "../../assets/icons/EventsIcon.svg";
import { ReactComponent as NewsIcon } from "../../assets/icons/NewsIcon.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/NotificationsIcon.svg";
import { ReactComponent as PromotionIcon } from "../../assets/icons/PromotionIcon.svg";
import { RevenueCard } from "../../components/Dashboard/RevenueCard";

const DashboardPage = () => {
  const totalMember = {
    title: "Total KSSIA Members",
    amount: 984,
    icon: TotalMemberIcon,
  };
  const totalRevenue = {
    title: "Total Revenue",
    amount: "₹ 28533",
    icon: RevenueIcon,
    percentage: '+12% ',
  };
  const membershipRevenue = {
    title: "Membership Revenue",
    amount: "₹ 19695",
    icon: MembershipRevenueIcon,
    percentage: '+12% ',
  };
  const appRevenue = {
    title: "App Revenue",
    amount: "₹ 8838",
    icon: AppRevenueIcon,
    percentage: '+12% ',
  };
  const activeMember = {
    title: "Active Users",
    amount: 840,
    icon: ActiveMemberIcon,
  };
  const premiumMember = {
    title: "Premium Users",
    amount: 136,
    icon: PremiumIcon,
  };
  const frozenMember = {
    title: "Frozen Users",
    amount: 4,
    icon: FrozenIcon,
  };
  const events = {
    title: "Events",
    amount: 18,
    icon: EventsIcon,
  };
  const news = {
    title: "News",
    amount: 12,
    icon: NewsIcon,
  };
  const notifications = {
    title: "Notifications",
    amount: 35,
    icon: NotificationIcon,
  };
  const promotions = {
    title: "Promotions",
    amount: 12,
    icon: PromotionIcon,
  };
  const products = {
    title: "Total Products",
    amount: 274,
    icon: TotalProductIcon,
  };
  const requirements = {
    title: "Total Requirements",
    amount: 163,
    icon: TotalRequirementIcon,
  };

  return (
    <>
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Dashboard
        </Typography>
      </Box>
      <Grid container padding={"15px"} paddingTop={3} spacing={4}>
        <Grid item md={6}>
          <Stack spacing={2}>
            {" "}
            <RevenueCard data={totalRevenue} isDate />
            <Stack direction={"row"} spacing={2}>
              {" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard isMobile data={membershipRevenue} isDate />{" "}
              </Box>{" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard isMobile data={appRevenue} isDate />{" "}
              </Box>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={6}>
          {" "}
          <Stack spacing={2}>
            {" "}
            <RevenueCard data={totalMember} />
            <Stack direction={"row"} spacing={2}>
              {" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard isMobile data={activeMember} />{" "}
              </Box>{" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard isMobile data={premiumMember} />{" "}
              </Box>
              <Box width={"100%"}>
                {" "}
                <RevenueCard isMobile data={frozenMember} />{" "}
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack direction={"row"} spacing={2}>
            {" "}
            <Box width={"100%"}>
              {" "}
              <RevenueCard spacing data={products} />{" "}
            </Box>{" "}
            <Box width={"100%"}>
              {" "}
              <RevenueCard spacing data={requirements} />{" "}
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
              {" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard data={events} height={"160px"} />{" "}
              </Box>{" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard data={news} height={"160px"} />{" "}
              </Box>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              {" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard data={notifications} height={"160px"} />{" "}
              </Box>{" "}
              <Box width={"100%"}>
                {" "}
                <RevenueCard data={promotions} height={"160px"} />{" "}
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
