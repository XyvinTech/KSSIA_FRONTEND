import { Box, Stack } from "@mui/material";
import { react, useEffect, useState } from "react";
import StyledSearchbar from "./StyledSearchbar";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import StyledTable from "./StyledTable";
import { userColumns, userData } from "../assets/json/TableData";
import { usePromotionStore } from "../store/promotionStore";
import { useNavigate } from "react-router-dom";

export default function StyledNoticeTable() {
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const { promotions, fetchPromotion, deletePromotions } = usePromotionStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleEdit = (id) => {
    navigate(`/promotion/edit/${id}`);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deletePromotions(id)));
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deletePromotions(id);
    setIsChange(!isChange);
  };
  useEffect(() => {
    fetchPromotion();
  }, [isChange]);
  const userColumns = [
    { title: "Date", field: "startDate", padding: "none" },

    { title: "Title", field: "notice_title" },
    { title: "Description", field: "notice_description" },
    { title: "Link", field: "notice_link" },
  ];
  return (
    <>
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={3}
          alignItems={"center"}
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
        </Stack>{" "}
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={userColumns}
            data={promotions}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            onDeleteRow={handleRowDelete}
            onModify={handleEdit}
          />{" "}
        </Box>
      </>
    </>
  );
}
