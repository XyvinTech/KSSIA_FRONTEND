import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import { StyledButton } from "../ui/StyledButton";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import RejectionEntryForm from "./Members/RejectionEntryForm";
import { useMemberStore } from "../store/member-store";

export default function MembersPayments({ id }) {
  const [filterOpen, setFilterOpen] = useState(false);

  const { fetchPaymentByUser, payments } = useMemberStore();
  const [isChange, setIsChange] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const userColumns = [
    { title: "Payment Date ", field: "date", padding: "none" },
    { title: "Category", field: "category" },
    { title: "Time", field: "time" },
    { title: "Expiry", field: "renewal" },
    { title: "Amount", field: "amount" },
    { title: "Payment Status", field: "status" },
  ];
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  useEffect(() => {
    fetchPaymentByUser(id);
  }, []);
  const handleChange = () => {
    setIsChange(!isChange);
  };

  const handleCloseReject = (id) => {
    setRejectOpen(false);
  };
  return (
    <>
      {" "}
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={3}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <Stack>
              <StyledSearchbar />
            </Stack>
            <Stack>
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
            <Stack>
              <StyledButton name="Download" variant="third">
                Download
              </StyledButton>
            </Stack>
          </Stack>
        </Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable columns={userColumns} data={payments} menu payment />{" "}
          <RejectionEntryForm
            open={rejectOpen}
            onClose={handleCloseReject}
            onChange={handleChange}
          />
        </Box>
      </>
    </>
  );
}
