import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable.jsx";
import { StyledButton } from "../../../ui/StyledButton.jsx";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../ui/StyledSearchbar.jsx";
import { useNavigate } from "react-router-dom";
import NewsPreview from "../../../components/NewsPreview.jsx";
import { useNewsStore } from "../../../store/newsStore.js";
import { toast } from "react-toastify";

export default function NewsAllpage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);

  const { singleNews, news, fetchNews, deleteNews, totalCount, fetchNewsById } =
    useNewsStore();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteNews(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteNews(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };

  const handleEdit = (id) => {
    navigate(`/news/edit/${id}`);
  };
  const handlePreview = async (id) => {
    await fetchNewsById(id);
    setPreviewOpen(true);
  };
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchNews(filter);
  }, [isChange, pageNo, search, row]);
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const userColumns = [
    { title: "Category", field: "category", padding: "none" },

    { title: "Title", field: "title" },
    { title: "Image", field: "image" },
  ];
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15PX"}
        alignItems={"center"}
        marginRight={2}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar
            placeholder={"Search news"}
            onchange={(e) => setSearch(e.target.value)}
          />
        </Stack>
      </Stack>
      {/* <Grid container item md={12} paddingBottom={4}>
        <Grid item md={6}>
          <Typography variant="h4" color={"#4A4647"}>
            News
          </Typography>
        </Grid>
      </Grid> */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        paddingBottom={"15px"}
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
          data={news}
          news
          onSelectionChange={handleSelectionChange}
          onModify={handleEdit}
          onAction={handlePreview}
          totalCount={totalCount}
          pageNo={pageNo}
          setPageNo={setPageNo}
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          rowPerSize={row}
          setRowPerSize={setRow}
        />{" "}
        <NewsPreview
          open={previewOpen}
          onClose={handleClosePreview}
          onChange={handleChange}
          onEdit={() => handleEdit(singleNews._id)}
          data={singleNews}
        />
      </Box>
    </>
  );
}
