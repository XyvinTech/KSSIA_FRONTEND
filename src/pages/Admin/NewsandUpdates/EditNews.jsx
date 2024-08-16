import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import SingleAddform from "../../../components/SingleAddform.jsx";
import BulkAddform from "../../../components/BulkAddform";
import NewsAddnewform from "../../../components/NewsAddnewform.jsx";

const EditNews = () => {
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
      <Box
        padding={"10px"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
        bgcolor={"#FFFFFF"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6} spacing={2}>
            <Typography variant="h4" color={"#4A4647"}>
              News List / Edit News
            </Typography>
          </Grid>{" "}
        </Grid>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <Grid container>
          <Grid item md={6}>
            <NewsAddnewform />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditNews;
