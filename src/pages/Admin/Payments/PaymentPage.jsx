import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import StyledTable from "../../../ui/StyledTable";
import { usePaymentStore } from "../../../store/payment-store";
import { toast } from "react-toastify";
import ParentSubscription from "../../../components/payments/ParentSubscription";
import { StyledButton } from "../../../ui/StyledButton";
import ParentSub from "../../../components/payments/ParentSub";
export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(false);
  const { payments, fetchPayment, deletePayments, totalCount } =
    usePaymentStore();
  const userColumns = [
    { title: "Member name", field: "full_name", padding: "none" },
    { title: "Date", field: "date" },
    { title: "Time", field: "time" },
    { title: "Category", field: "category" },
    { title: "Amount", field: "amount" },
    { title: "Status", field: "status" },
  ];

  const handleChange = () => {
    setIsChange(!isChange);
  };
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    filter.limit = row;
    filter.pageNo = pageNo;
    fetchPayment(filter);
  }, [isChange, pageNo, search, row]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deletePayments(id)));
      toast.success("Payments deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };

  const handleParent = () => {
    setOpen(true);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"#4A4647"}>
              Payments
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              {selectedTab === 2 && (
                <StyledButton
                  name="Add"
                  variant="primary"
                  onClick={handleParent}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#004797",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          paddingTop: "10px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#004797",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            margin: "0 30px",
          },
          "& .Mui-selected": {
            color: "#004797",
          },
        }}
      >
        <Tab label="Active Payments" />
        <Tab label="Pending Payments" />
        <Tab label="Parent Subscription" />
      </Tabs>
      <Divider />
      {selectedTab === 0 && (
        <Box padding="15px" marginBottom={4}>
          <>
            <Stack
              direction={"row"}
              justifyContent={"end"}
              paddingBottom={"15px"}
              alignItems={"center"}
            >
              <Stack direction={"row"} spacing={2}>
                <StyledSearchbar
                  placeholder={"Search payments"}
                  onchange={(e) => setSearch(e.target.value)}
                />
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
                data={payments}
                onSelectionChange={handleSelectionChange}
                onDelete={handleDelete}
                menu
                totalCount={totalCount}
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                setRowPerSize={setRow}
              />{" "}
            </Box>
          </>
        </Box>
      )}
      {selectedTab === 2 && (
        <Box padding="15px" marginBottom={4}>
          <ParentSubscription />
        </Box>
      )}
      <ParentSub open={open} onClose={() => setOpen(false)} />
    </>
  );
}
