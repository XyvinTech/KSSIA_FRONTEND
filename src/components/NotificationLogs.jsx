import { Box, Stack } from "@mui/material";
import { react, useEffect, useState } from "react";
import StyledSearchbar from "../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import StyledTable from "../ui/StyledTable.jsx";
import { userColumns, userData } from "../assets/json/TableData";
import { useNotificationStore } from "../store/notificationStore.js";
import { toast } from "react-toastify";

export default function NotificationLogs() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { notifications, fetchNotification, deleteNotifications,totalCount } =
    useNotificationStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
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
    fetchNotification(filter);
  }, [isChange, pageNo]);
  const userColumns = [
    { title: "Date", field: "createdAt", padding: "none" },

    { title: "Type", field: "type" },
    { title: "Subject", field: "subject" },
    { title: "Content", field: "content" },
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
            data={notifications}
            menu
            totalCount={totalCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
          />{" "}
        </Box>
      </>
    </>
  );
}
