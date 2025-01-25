import { Box, Stack } from "@mui/material";
import { react, useEffect, useState } from "react";
import StyledSearchbar from "./StyledSearchbar";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import StyledTable from "./StyledTable";
import { usePromotionStore } from "../store/promotionStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StyledNoticeTable() {
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { promotions, fetchPromotion, deletePromotions,updatePromotion, totalCount } =
    usePromotionStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleActiveStatus = async (id) => {
    try {
      await updatePromotion(id, { status: true, type: "notice" });
      setIsChange(!isChange);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleInactiveStatus = async (id) => {
    try {
      await updatePromotion(id, { status: false, type: "notice" });
      setIsChange(!isChange);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleEdit = (id) => {
    navigate(`/promotion/edit/${id}`, { state: { value: "notice" } });
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deletePromotions(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deletePromotions(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchPromotion("notice", filter);
  }, [isChange, pageNo, row]);
  const userColumns = [
    { title: "Date", field: "startDate", padding: "none" },

    { title: "Title", field: "notice_title" },
    { title: "Link", field: "notice_link" },
    {title:"Status",field:"status"},
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
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            totalCount={totalCount}
            pageNo={pageNo}
            promotion
            onAction={handleActiveStatus}
            onApprove={handleInactiveStatus}
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
