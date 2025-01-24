import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import PayementView from "./PayementView";
export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [openView, setOpenView] = useState(false);

  const { payments, fetchPayment, deletePayments, totalCount, patchPayments,fetchSinglePayment,singlePayment } =
    usePaymentStore();
  const userColumns = [
    { title: "Member name", field: "full_name", padding: "none" },
    { title: "Expiry Date", field: "expiry_date" },
    { title: "Year", field: "year" },
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
    if (selectedTab === 1) {
      filter.status = "active";
    }
    if (selectedTab === 2) {
      filter.status = "pending";
    }
    fetchPayment(filter);
  }, [isChange, pageNo, search, row, selectedTab]);

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
  const handleApprove = async (id) => {
    setPaymentId(id);
    setConfirmationAction("approve");
    setConfirmOpen(true);
  };

  const handleReject = async (id) => {
    setPaymentId(id);
    setConfirmationAction("reject");
    setConfirmOpen(true);
  };
  const confirmAction = async () => {
    if (confirmationAction === "approve") {
      await patchPayments(paymentId, { status: "accepted" });
    } else if (confirmationAction === "reject") {
      await patchPayments(paymentId, { status: "cancelled" });
    }
    setConfirmOpen(false);
    setIsChange(!isChange);
  };
  const handleView = async (id) => {
    await fetchSinglePayment(id);
    setOpenView(true);
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
              {selectedTab === 3 && (
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
        <Tab label="All Payments" />
        <Tab label="Active Payments" />
        <Tab label="Pending Payments" />
        <Tab label="Parent Subscription" />
      </Tabs>
      <Divider />
      {(selectedTab === 0 || selectedTab === 1 || selectedTab === 2) && (
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
                payment
                onView={handleView}
                totalCount={totalCount}
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                onModify={handleApprove}
                onAction={handleReject}
                setRowPerSize={setRow}
              />{" "}
            </Box>
          </>
        </Box>
      )}
      {selectedTab === 3 && (
        <Box padding="15px" marginBottom={4}>
          <ParentSubscription />
        </Box>
      )}
      <ParentSub open={open} onClose={() => setOpen(false)} />
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">
          {confirmationAction === "approve"
            ? "Confirm Approval"
            : "Confirm Rejection"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {confirmationAction === "approve" ? "approve" : "reject"} this
            payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            name="Cancel"
            variant="secondary"
            onClick={() => setConfirmOpen(false)}
          />
          <StyledButton
            name={confirmationAction === "approve" ? "Approve" : "Reject"}
            variant="primary"
            onClick={confirmAction}
          />
        </DialogActions>
      </Dialog>
      <PayementView open={openView} onClose={() => setOpenView(false)}data={singlePayment} />
    </>
  );
}
