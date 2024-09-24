import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton.jsx";
import StyledSearchbar from "../../../ui/StyledSearchbar.jsx";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable.jsx";
import { useRoleStore } from "../../../store/roleStore.js";
import { toast } from "react-toastify";
export default function RoleManagement() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { roles, getRoles, totalCount ,deleteRoles} = useRoleStore();
  useEffect(() => {
    getRoles();
  }, [isChange]);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteRoles(id)));
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
      await deleteRoles(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const roleColumns = [
    { title: "Role Name", field: "roleName", padding: "none" },
    { title: "Created on", field: "createdAt" },
    { title: "Access ", field: "contact" },
    { title: "Description", field: "description" },
    { title: "Status", field: "status" },
  ];
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  const handleView = (id) => {
    console.log("View item:", id);
    navigate(`/events/eventlist/:id`);
  };
  const handleView2 = (id) => {
    navigate(`/settings/addrole`);
  };
  const handleEdit = (id) => {
    navigate(`/settings/addrole`, {
      state: { roleId: id, isUpdate: true },
    });
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
                name="Add role"
                variant="primary"
                onClick={handleView2}
              >
                Add role
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid marginTop={"15px"}>
          {" "}
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable
              columns={roleColumns}
              data={roles}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
              onModify={handleEdit}
              totalCount={totalCount}
              pageNo={pageNo}
              setPageNo={setPageNo}
              onDelete={handleDelete}
              onDeleteRow={handleRowDelete}
            />{" "}
          </Box>
        </Grid>
      </>
    </>
  );
}
