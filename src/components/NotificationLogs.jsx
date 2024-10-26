import { Box, Stack } from "@mui/material";
import { react, useEffect, useState } from "react";
import StyledSearchbar from "../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import StyledTable from "../ui/StyledTable.jsx";
import { userColumns, userData } from "../assets/json/TableData";
import { useNotificationStore } from "../store/notificationStore.js";
import { toast } from "react-toastify";
import NotificationView from "./NotificationView.jsx";

export default function NotificationLogs() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [row, setRow] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const {
    notifications,
    fetchNotification,
    deleteNotifications,
    totalCount,
    notification,
    fetchSingleNotification,
  } = useNotificationStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleView = async (id) => {
    console.log("View item Selected", id);
    
    await fetchSingleNotification(id);
    setPreviewOpen(true);
  };
  const handleCloseView = () => {
    setPreviewOpen(false);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteNotifications(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit=row;
    fetchNotification(filter);
  }, [isChange, pageNo,row]);
  const userColumns = [
    { title: "Date", field: "createdAt", padding: "none" },

    { title: "Type", field: "type" },
    { title: "Subject", field: "subject" },
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
          <Stack direction={"row"} spacing={2}>
           
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
            data={notifications}
            notification
            totalCount={totalCount}
            pageNo={pageNo}
            onView={handleView}
            onApprove={handleView}
            setPageNo={setPageNo}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            rowPerSize={row}
            setRowPerSize={setRow}
          />{" "}
          <NotificationView
            open={previewOpen}
            onClose={handleCloseView}
            data={notification}
          />
        </Box>
      </>
    </>
  );
}
