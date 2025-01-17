import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { usePaymentStore } from "../../store/payment-store";

const ParentSubscription = () => {
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const{payments,totalCount,fetchParentSub} = usePaymentStore();
  useEffect(() => {
    fetchParentSub();
  }, [pageNo, row]);
  const parentSubColums = [
    { title: "Year", field: "academicYear" },
    
    { title: "Expiry Date", field: "expiryDate" },
  ];
  return (
    <Box
      borderRadius={"16px"}
      bgcolor={"white"}
      p={1}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <StyledTable
        columns={parentSubColums}
        data={payments}
        menu
        totalCount={totalCount}
        pageNo={pageNo}
        setPageNo={setPageNo}
        rowPerSize={row}
        setRowPerSize={setRow}
      />{" "}
    </Box>
  );
};

export default ParentSubscription;
