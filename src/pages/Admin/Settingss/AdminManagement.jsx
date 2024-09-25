import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton.jsx";
import StyledSearchbar from "../../../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable.jsx";
import { useAdminStore } from "../../../store/adminStore.js";
import { toast } from "react-toastify";
export default function AdminManagement() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { fetchAdmins, totalCount, admins,deleteAdmins } = useAdminStore();
  const userColumns = [
    { title: "Name", field: "name", padding: "none" },
    { title: "Email", field: "email" },
    { title: "Created At", field: "createdAt" },
  ];
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteAdmins(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deleteAdmins(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  useEffect(() => {
    let filter={};
    filter.pageNo = pageNo;
    fetchAdmins(filter);
  }, [isChange,pageNo]);
  const handleEdit = (id) => {
    navigate(`/settings/addnewadmin`, {
      state: { adminId: id, isUpdate: true },
    });
  };
  const handleView2 = (id) => {
    navigate(`/settings/addnewadmin`);
  };
  return (
    <>
      {" "}
      <>
        <Grid container alignItems="center">
          <Grid item xs={6}></Grid>
          <Grid
            item
            xs={6}
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item>
              <StyledSearchbar />
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
              <StyledButton
                name="Add new admin"
                variant="primary"
                onClick={handleView2}
              >
                Add new admin
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid marginTop={"15px"}>
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable
              columns={userColumns}
              data={admins}
              onModify={handleEdit}
              totalCount={totalCount}
              pageNo={pageNo}
              setPageNo={setPageNo}
              onDelete={handleDelete}
              onDeleteRow={handleRowDelete}
              onSelectionChange={handleSelectionChange}
            />{" "}
          </Box>
        </Grid>
      </>
    </>
  );
}
