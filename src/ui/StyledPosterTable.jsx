import { Box, Stack } from "@mui/material";
import { react, useEffect, useState } from "react";
import StyledSearchbar from "./StyledSearchbar";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import StyledTable from "./StyledTable";
import { userColumns, userData } from "../assets/json/TableData";
import { usePromotionStore } from "../store/promotionStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StyledPosterTable() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const {
    promotions,
    fetchPromotion,
    deletePromotions,
    updatePromotion,
    totalCount,
  } = usePromotionStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleEdit = (id) => {
    navigate(`/promotion/edit/${id}`, { state: { value: "poster" } });
  };
  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        await Promise.all(selectedRows?.map((id) => deletePromotions(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deletePromotions(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleActiveStatus = async (id) => {
    try {
      await updatePromotion(id, { status: true, type: "poster" });
      setIsChange(!isChange);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleInactiveStatus = async (id) => {
    try {
      await updatePromotion(id, { status: false, type: "poster" });
      setIsChange(!isChange);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchPromotion("poster", filter);
  }, [isChange, pageNo, row]);
  const userColumns = [
    { title: "Start Date", field: "startDate", padding: "none" },
    { title: "End Date", field: "endDate", padding: "none" },
    { title: "Title", field: "poster_title", padding: "none" },
    { title: "Media", field: "poster_image_url" },
    { title: "Status", field: "status" },
  ];
  return (
    <>
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}></Stack>
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
            promotion
            onAction={handleActiveStatus}
            onApprove={handleInactiveStatus}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            totalCount={totalCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            onDeleteRow={handleRowDelete}
            onModify={handleEdit}
            rowPerSize={row}
            setRowPerSize={setRow}
          />{" "}
        </Box>
      </>
    </>
  );
}
