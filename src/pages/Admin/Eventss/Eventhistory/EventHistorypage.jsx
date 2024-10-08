import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../../ui/StyledTable.jsx";
import { eventColumns, userData } from "../../../../assets/json/TableData";
import { StyledButton } from "../../../../ui/StyledButton";
import StyledSearchbar from "../../../../ui/StyledSearchbar";
import { useEventStore } from "../../../../store/event-store.js";
export default function EventHistorypage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const { eventHistory, events,totalCount } = useEventStore();
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.search = search;
    }
    filter.limit=row
    filter.pageNo = pageNo;
    eventHistory(filter);
  }, [pageNo, search,row]);
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
              Event history
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box padding="15px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={'15px'}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
            <StyledSearchbar
                placeholder={"Search events"}
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
            <StyledTable columns={eventColumns} data={events}  pageNo={pageNo}
              setPageNo={setPageNo}    rowPerSize={row}
              setRowPerSize={setRow} totalCount={totalCount}/>{" "}
          </Box>
        </>
      </Box>
    </>
  );
}
