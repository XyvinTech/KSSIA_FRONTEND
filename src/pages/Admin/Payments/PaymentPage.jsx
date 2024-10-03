import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import RejectionEntryForm from "../../../components/Members/RejectionEntryForm";
import MemberShipRenewal from "../../../components/MemberShipRenewal";
import { usePaymentStore } from "../../../store/payment-store";
import { toast } from "react-toastify";
export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [isChange, setIsChange] = useState(false);

  const {
    payments,
    fetchPayment,
    deletePayments,
    fetchPaymentById,
    totalCount,
    payment,
  } = usePaymentStore();
  const userColumns = [
    { title: "Member name", field: "full_name", padding: "none" },
    { title: "Date", field: "date" },
    { title: "Time", field: "time" },
    { title: "Category", field: "category" },
    { title: "Amount", field: "amount" },
    { title: "Mode of payment", field: "mode_of_payment" },
    { title: "Status", field: "status" },
  ];
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.search = search;
    }
    filter.pageNo = pageNo;
    fetchPayment(filter);
  }, [isChange, pageNo, search]);

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
  const handleRowDelete = async (id) => {
    await deletePayments(id);
    toast.success("Payment deleted successfully");
    setIsChange(!isChange);
  };
  const handleView2 = (id) => {
    navigate(`/payments/addpaymentdetails`);
  };
  const handleEdit = (id) => {
    navigate(`/payments/addpaymentdetails`, {
      state: { paymentId: id, isUpdate: true },
    });
  };
  const handleApprove = async (id) => {
    await fetchPaymentById(id);
    setApproveOpen(true);
  };
  const handleCloseApprove = () => {
    setApproveOpen(false);
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
              <StyledButton
                name="Add"
                variant="secondary"
                onClick={handleView2}
              >
                Add
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton name="Download" variant="primary">
                Download
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
              data={payments}
              onSelectionChange={handleSelectionChange}
              onView={handleApprove}
              onDelete={handleDelete}
              onModify={handleEdit}
              totalCount={totalCount}
              pageNo={pageNo}
              setPageNo={setPageNo}
              onDeleteRow={handleRowDelete}
            />{" "}
            <MemberShipRenewal
              open={approveOpen}
              onClose={handleCloseApprove}
              data={payment}
              onChange={handleChange}
            />
          </Box>
        </>
      </Box>
    </>
  );
}
