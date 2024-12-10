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
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);

  const {
    payments,
    fetchPayment,
    deletePayments,
    totalCount,
  } = usePaymentStore();
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

  const handleView2 = (id) => {
    navigate(`/payments/addpaymentdetails`);
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
            <Grid item></Grid>
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
    </>
  );
}
