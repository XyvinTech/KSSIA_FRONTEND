import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { userColumns } from "../../../assets/json/TableData";
import axiosInstance from "../../../api/axios-interceptor";
import CONSTANTS from "../../../constants";
import SuspendProfile from "../../../components/SuspendProfile";
import DeleteProfile from "../../../components/DeleteProfile";
export default function MembersPage() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(null);
  const userColumns = [
    { title: "Name", field: "full_name", padding: "none" },
    { title: "Member ID", field: "membership_id" },
    { title: "Company Name", field: "company_name" },
    { title: "Designation", field: "designation" },
    { title: "Phone Number", field: "mobile" },
    // { title: "Subscription", field: "status" },
    // { title: "Rating", field: "rating" },
    // { title: "Membership Status", field: "status" },
  ];
  useEffect(() => {
    async function fetchUserData() {
      const response = await axiosInstance.get(CONSTANTS.MEMBERS_API);
      if (response.status != 200) {
        // handle error
        return;
      }
      setUserData(response.data.data);
    }
    fetchUserData();
  }, []);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSuspend = (id) => {
    setUserId(id) 
    setSuspendOpen(true);
  };
  const handleCloseSuspend = () => {
    setSuspendOpen(false);
  };
  // const handleDelete = () => {
  //   setDeleteOpen(true);
  // };
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleView = (id) => {
    navigate(`/members/member/${id}`);
  };
  const handleEdit = (id) => {

    navigate(`/members/addmember`, {
      state: { memberId:id, isUpdate: true },
    });
  };
  const handleDelete = async (id) => {
    const resp = await axiosInstance.delete(`${CONSTANTS.MEMBERS_API}/${id}`);
    if (resp.status != 200) {
      // handle error
      return;
    }
    setUserData((userDatas) => {
      return userDatas.filter((userData) => userData.id != id);
    });
  };
  const handleView2 = (id) => {
    navigate(`/members/addmember`);
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
              Members List
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <StyledButton name="Download" variant="secondary">
                Download
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton
                name="Add new member"
                variant="primary"
                onClick={handleView2}
              >
                Add new member
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
              <StyledSearchbar />
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
              data={userData}
              onView={handleView}
              member
              onModify={handleEdit}
              onAction={handleSuspend}
              onDelete={handleDelete}
            />{" "}
          </Box>
          <SuspendProfile
            open={suspendOpen}
            onClose={handleCloseSuspend}
            onChange={handleChange}
            id={userId}
          />
          <DeleteProfile
            open={deleteOpen}
            onClose={handleCloseDelete}
            onChange={handleChange}
          />
        </>
      </Box>
    </>
  );
}
