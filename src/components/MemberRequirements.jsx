import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import { useApprovalStore } from "../store/approval-store";
import { StyledButton } from "../ui/StyledButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRequirementStore from "../store/requirementStore";

export default function MembersRequirements({ id }) {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [row, setRow] = useState(10);
  const { approvalByUser, fetchApprovalByUser, totalCount } =
    useApprovalStore();
  const { deleteRequiremnts } = useRequirementStore();
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchApprovalByUser(id, filter);
  }, [pageNo, row, isChange]);
  const userColumns = [
    { title: "date", field: "createdAt", padding: "none" },
    { title: "image", field: "image" },
    { title: "Content", field: "content" },
    { title: "Status", field: "status" },
  ];
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        await Promise.all(selectedRows?.map((id) => deleteRequiremnts(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {" "}
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <StyledButton
              name="Add Requirement"
              variant="primary"
              onClick={() =>
                navigate(`/requirement/addrequirement`, {
                  state: { userId: id },
                })
              }
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
            rowPerSize={row}
            setRowPerSize={setRow}
            data={approvalByUser}
            pageNo={pageNo}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            setPageNo={setPageNo}
            totalCount={totalCount}
            menu
          />{" "}
        </Box>
      </>
    </>
  );
}
