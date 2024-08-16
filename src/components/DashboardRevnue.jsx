import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import DashboardCard from "../ui/DashboardCard";
import { LineChart } from "@mui/x-charts/LineChart";

export default function DashboardRevenue() {
  const totalRevenue = "30";
  const appRevenue = "30";
  const membershipRevenue = "30";

  const chartData = [
    { month: "Jan", app: 4000, membership: 3000 },
    { month: "Feb", app: 3000, membership: 3500 },
    { month: "Mar", app: 5000, membership: 4000 },
    { month: "Apr", app: 4500, membership: 4800 },
    { month: "May", app: 6000, membership: 5200 },
    { month: "Jun", app: 5500, membership: 5700 },
    { month: "Jul", app: 7000, membership: 6500 },
  ];

  return (
    <>
      <Typography
        variant="h6"
        color={"#686465"}
        fontWeight={400}
        sx={{ padding: "0 0 16px 0", fontSize: 16 }}
      >
        Revenue
      </Typography>

      <Grid container spacing={2} item xs={12}>
        <Grid item xs={6}>
          <Box
            bgcolor={"#E4EDF7"}
            display="flex"
            justifyContent="start"
            alignItems="flex-start"
            height="100%"
          >
            <DashboardCard
              data={{
                title: "Total Revenue",
                value: totalRevenue,
                bgcolor: "#E4EDF7",
                color: "#4A4647",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="column" spacing={2}>
            <DashboardCard
              data={{
                title: "App Revenue",
                value: appRevenue,
                bgcolor: "#FFFFFF",
                color: "#4A4647",
              }}
            />

            <DashboardCard
              data={{
                title: "Membership Revenue",
                value: membershipRevenue,
                bgcolor: "#FFFFFF",
                color: "#4A4647",
              }}
            />
          </Stack>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              height: "400px",
              padding: "20px",
              // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: "8px",
              marginTop: "16px",
            }}
          >
            <LineChart
              xAxis={[
                {
                  data: chartData.map((item) => item.month),
                  scaleType: "point",
                },
              ]}
              series={[
                {
                  data: chartData.map((item) => item.app),
                  label: "App Revenue",
                  color: "#B0E102",
                  curve: "linear",
                },
                {
                  data: chartData.map((item) => item.membership),
                  label: "Membership Revenue",
                  color: "#B37F43",
                  curve: "linear",
                },
              ]}
              height={350}
              margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
              yAxis={[{ min: 0 }]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: { top: 0, bottom: 0, left: 0, right: 0 },
                  itemMarkWidth: 10,
                  itemMarkHeight: 10,
                  markGap: 5,
                  itemGap: 30,
                  labelStyle: {
                    fontSize: 14,
                    fill: "#686465",
                  },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
