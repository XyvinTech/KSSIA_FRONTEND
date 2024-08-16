import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledTable from "../../../ui/StyledTable.jsx";
import { userColumns, userData } from "../../../assets/json/TableData";
import { StyledButton } from "../../../ui/StyledButton.jsx";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../ui/StyledSearchbar.jsx";
import { useNavigate } from "react-router-dom";
import NewsPreview from "../../../components/NewsPreview.jsx";

export default function NewsAllpage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleEdit = (id) => {
    navigate(`/news/edit`);
  };
  const handlePreview = () => {
    setPreviewOpen(true);
  };
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={3}
        alignItems={"center"}
        marginRight={2}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar />
          <Box
            bgcolor={"#FFFFFF"}
            borderRadius={"50%"}
            width={"48px"}
            height={"48px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(0, 0, 0, 0.12)"
            onClick={handleOpenFilter}
            style={{ cursor: "pointer" }}
          >
            <FilterIcon />
          </Box>
        </Stack>
      </Stack>
      <Grid container item md={12} paddingBottom={4}>
        <Grid item md={6}>
          <Typography variant="h4" color={"#4A4647"}>
            News
          </Typography>
        </Grid>
      </Grid>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        paddingBottom={3}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            name="All"
            variant={selectedTab === "All" ? "primary" : "secondary"}
            onClick={() => handleTabChange("All")}
          />
          <StyledButton
            name="Latest"
            variant={selectedTab === "Latest" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Latest")}
          />
          <StyledButton
            name="Business"
            variant={selectedTab === "Business" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Business")}
          />
          <StyledButton
            name="Market"
            variant={selectedTab === "Market" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Market")}
          />
          <StyledButton
            name="Economy"
            variant={selectedTab === "Economy" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Economy")}
          />
        </Stack>
      </Stack>
      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        <StyledTable
          columns={userColumns}
          data={userData}
          news
          onSelectionChange={handleSelectionChange}
          onModify={handleEdit}
          onAction={handlePreview}
        />{" "}
        <NewsPreview open={previewOpen} onClose={handleClosePreview} />
      </Box>
    </>
  );
}
