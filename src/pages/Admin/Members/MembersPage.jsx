import { Badge, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import axiosInstance from "../../../api/axios-interceptor";
import CONSTANTS from "../../../constants";
import SuspendProfile from "../../../components/SuspendProfile";
import DeleteProfile from "../../../components/DeleteProfile";
import { useMemberStore } from "../../../store/member-store";
import { toast } from "react-toastify";
import StyledFilter from "../../../ui/StyledFilter";
import { getDwld } from "../../../api/members-api";
import { generateExcel } from "../../../utils/generateExcel";

export default function MembersPage() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [total, setTotal] = useState(0);
  const [row, setRow] = useState(10);
  const { deleteUsers } = useMemberStore();
  const [pageNo, setPageNo] = useState(1);
  const [userId, setUserId] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    membershipId: "",
    designation: "",
    companyName: "",
    status: "",
    subscription: "",
    installed: "",
  });
  const userColumns = [
    { title: "Name", field: "full_name", padding: "none" },
    { title: "Member ID", field: "membership_id" },
    { title: "Company Name", field: "company_name" },
    { title: "Designation", field: "designation" },
    { title: "Phone Number", field: "mobile" },
    { title: "Subscription", field: "subscription" },
    {title: "Status", field: "status" },
  ];
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  useEffect(() => {
    async function fetchUserData() {
      try {
        let filter = {};
        if (search) {
          filter.search = search;
          setPageNo(1);
        }
        filter.limit = row;
        filter.pageNo = pageNo;
        if (filters.name) filter.name = filters.name;
        if (filters.membershipId) filter.membershipId = filters.membershipId;
        if (filters.designation) filter.designation = filters.designation;
        if (filters.companyName) filter.companyName = filters.companyName;
        if (filters.status) filter.status = filters.status;
        if (filters.subscription) filter.subscription = filters.subscription;
        if (typeof filters.installed === 'boolean') {
          filter.installed = filters.installed;
      }
      
        const response = await axiosInstance.get(CONSTANTS.MEMBERS_API, {
          params: filter,
        });

        if (response.status !== 200) {
          return;
        }

        setUserData(response.data.data);
        setTotal(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [isChange, pageNo, search, row, filters]);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSuspend = (id) => {
    setUserId(id);
    setSuspendOpen(true);
  };
  const handleCloseSuspend = () => {
    setSuspendOpen(false);
  };
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleView = (id) => {
    navigate(`/members/member/${id}`);
  };
  const handleApprove = (id) => {
    navigate(`/members/member/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/members/addmember`, {
      state: { memberId: id, isUpdate: true },
    });
  };
  const handleDownload = async () => {
    try {
      let filter = {};
  
      // Add filters if they are present
      if (filters.name) filter.name = filters.name;
      if (filters.membershipId) filter.membershipId = filters.membershipId;
      if (filters.designation) filter.designation = filters.designation;
      if (filters.companyName) filter.companyName = filters.companyName;
      if (filters.status) filter.status = filters.status;
      if (filters.subscription) filter.subscription = filters.subscription;
      if(filters.installed) filter.installed = filters.installed;
      // Fetch the data using the API
      const data = await getDwld(filter);
  
      // Check and generate Excel if data is valid
      const csvData = data.data;
      if (csvData && csvData.headers && csvData.body) {
        generateExcel(csvData.headers, csvData.body);
      } else {
        console.error(
          "Error: Missing headers or data in the downloaded content"
        );
      }
    } catch (error) {
      console.error("Error downloading users:", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        await Promise.all(selectedRows?.map((id) => deleteUsers(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deleteUsers(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.error(error.message);
    }
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
              Members
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <StyledButton
                name="Download"
                variant="secondary"
                onClick={handleDownload}
              >
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
                placeholder={"Search members"}
                onchange={(e) => setSearch(e.target.value)}
              />
              <Badge
                color="error"
                variant="dot"
                invisible={
                  !(
                    filters.name ||
                    filters.membershipId ||
                    filters.designation ||
                    filters.companyName ||
                    filters.status||
                    filters.subscription||
                    (filters.installed !== undefined && filters.installed !== "")
                  )
                }
                sx={{
                  "& .MuiBadge-dot": {
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                  },
                }}
                overlap="circular"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
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
                  {" "}
                  <FilterIcon />
                </Box>
              </Badge>
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
              totalCount={total}
              onView={handleView}
              member
              onApprove={handleApprove}
              pageNo={pageNo}
              setPageNo={setPageNo}
              onSelectionChange={handleSelectionChange}
              onModify={handleEdit}
              onDeleteRow={handleRowDelete}
              onAction={handleSuspend}
              onDelete={handleDelete}
              rowPerSize={row}
              setRowPerSize={setRow}
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
          <StyledFilter
            open={filterOpen}
            onClose={handleCloseFilter}
            onApply={handleApplyFilter}
          />
        </>
      </Box>
    </>
  );
}
