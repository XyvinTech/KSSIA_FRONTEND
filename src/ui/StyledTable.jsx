import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Divider,
  Stack,
  TablePagination,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";
import { ReactComponent as ViewIcon } from "../assets/icons/ViewIcon.svg";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledButton } from "./StyledButton";
import moment from "moment";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 16px;

    text-align: center;
    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    background-color: #fff;
    padding: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  cursor: ${({ showEdit }) => (showEdit ? "pointer" : "default")};
  &:hover {
    background-color: ${({ showEdit }) => (showEdit ? "#f0f0f0" : "inherit")};
  }
`;

const StyledTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  onModify,
  onAction,
  menu,
  data,
  news,
  notification,
  pageNo,
  setPageNo,
  totalCount,
  onDeleteRow,
  dashboard,
  member,
  report,
  product,
  promotion,
  onApprove,
  payment,
  rowPerSize,
  setRowPerSize,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);

  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? data.map((row) => row._id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleRowDelete = (id) => {
    onDeleteRow(id);
    handleMenuClose();
  };
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setRowId(null);
  };

  const handleView = (rowId) => {
    // console.log("View item Selected", rowId);
    onView(rowId);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
    setSelectedIds([]);
    handleMenuClose();
  };
  const handleAction = () => {
    onAction(rowId);
    handleMenuClose();
  };

  const handleModify = () => {
    onModify(rowId);
    handleMenuClose();
  };
  const handleApprove = () => {
    onApprove(rowId);
    handleMenuClose();
  };

  const handleRowClick = (id) => {
    onView(id);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const pageInc = () => {
    setPageNo((prev) => prev + 1);
  };
  const pageDec = () => {
    setPageNo((prev) => prev - 1);
  };
  const isSelected = (id) => selectedIds.includes(id);
  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };
  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "green" : "red";
    }
    switch (status) {
      case "pending":
        return "#f0ad4e"; // Amber color for pending
      case "inactive":
        return "#cccccc"; // Gray color for inactive
      case "accepted":
        return "#1890ff"; // Blue color for accepted
      case "rejected":
        return "#ff4d4f"; // Red color for rejected
      case "reported":
        return "#ff4d4f"; // Red color for reported
      case "approved":
        return "#52c41a"; // Green color for approved
      case "completed":
        return "#52c41a"; // Green color for completed
      case "live":
        return "#1890ff"; // Blue color for live
      case "upcoming":
        return "#faad14"; // Yellow color for upcoming
      case "active":
        return "green"; // Green color for active
      case "expired":
        return "#8c8c8c"; // Gray color for expired
      case "expiring":
        return "#faad14"; // Yellow color for expiring
      case "suspended":
        return "#d9d9d9"; // Grayish color for suspended
      case "cancelled":
        return "#ff7875"; // Light red color for cancelled
      default:
        return "default"; // Default color
    }
  };
  const formatIndianDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };
  const formatTime = (time) => {
    return moment(time).format("h:mm A");
  };
  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <TableContainer sx={{ border: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={
                    data &&
                    data.length > 0 &&
                    selectedIds.length === data.length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  padding={column.padding || "normal"}
                >
                  {column.title}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="normal"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </StyledTableCell>

                  {columns.map((column) => (
                    <StyledTableCell key={column.field}>
                      <Skeleton variant="text" width="100%" height={20} />
                    </StyledTableCell>
                  ))}

                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <Skeleton variant="circular" width={24} height={24} />

                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ marginLeft: 1 }}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : !data || data.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + 2}>
                  <Typography variant="h6" textAlign="center">
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data.map((row) => (
                <StyledTableRow
                  role="checkbox"
                  key={row._id}
                  selected={isSelected(row._id)}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row._id)}
                      onChange={(event) =>
                        handleRowCheckboxChange(event, row._id)
                      }
                    />
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      padding={column.padding || "normal"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row._id)}
                    >
                      {[
                        "renewal",
                        "paymentdate",
                        "date",
                        "expiryDate",
                        "createdAt",
                        "expiry_date",
                        "startDate",
                        "endDate",
                      ].includes(column.field) ? (
                        formatIndianDate(row[column.field])
                      ) : [
                          "starttime",
                          "endtime",
                          "time",
                          "startTime",
                          "endTime",
                        ].includes(column.field) ? (
                        formatTime(row[column.field])
                      ) : [
                        "banner_image_url",
                        "poster_image_url",
                        "image",
                        "event image",
                        "speaker_image",
                      ].includes(column.field) ? (
                        row[column.field] ? (
                          <img
                            src={row[column.field]}
                            alt={column.title}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        ) : (
                          "-"
                        )
                      ) : column.field === "status" ||
                        column.field === "activate" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              backgroundColor: getStatusVariant(
                                row[column.field]
                              ),
                              padding: "3px 8px",
                              borderRadius: "100px",
                              color: "#fff",
                            }}
                          >
                            {row[column.field] === true ||
                            row[column.field] === "activated"
                              ? "active"
                              : row[column.field] === false ||
                                row[column.field] === "deactivated"
                              ? "inactive"
                              : row[column.field]}
                          </span>
                        </Box>
                      ) : (
                        row[column.field]
                      )}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell padding="normal">
                    <Box display="flex" alignItems="center">
                      {onView && (
                        <IconButton
                          aria-controls="simple-view"
                          aria-haspopup="true"
                          onClick={() => handleView(row._id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}{" "}
                      {!menu &&
                        row.status !== "expired" &&
                        row.status !== "rejected" &&
                        row.status !== "reported" &&
                        row.status !== "cancelled" &&
                        row.status !== "approved" && (
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, row._id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        )}
                      <Menu
                        id="row-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && rowId === row._id}
                        onClose={handleMenuClose}
                      >
                        {news ? (
                          <>
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            <MenuItem onClick={handleAction}>
                              Publish/Unpublish
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleRowDelete(row._id)}
                              style={{ color: "red" }}
                            >
                              Remove
                            </MenuItem>
                          </>
                        ) : promotion ? (
                          <>
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            {row.status === true && (
                              <MenuItem onClick={handleApprove}>
                                Inactive
                              </MenuItem>
                            )}
                            {row.status === false && (
                              <MenuItem onClick={handleAction}>Active</MenuItem>
                            )}

                            <MenuItem
                              onClick={() => handleRowDelete(row._id)}
                              style={{ color: "red" }}
                            >
                              Remove
                            </MenuItem>
                          </>
                        ) : report ? (
                          <>
                            <MenuItem onClick={handleAction}>View Report</MenuItem>
                            <MenuItem
                              onClick={() => handleRowDelete(row._id)}
                              style={{ color: "red" }}
                            >
                              Remove
                            </MenuItem>
                          </>
                        ) : member ? (
                          <>
                            <MenuItem onClick={handleApprove}>
                              View Details
                            </MenuItem>
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            <MenuItem onClick={handleAction}>Suspend</MenuItem>
                            <MenuItem
                              onClick={() => handleRowDelete(row._id)}
                              style={{ color: "red" }}
                            >
                              Delete
                            </MenuItem>
                          </>
                        ) : notification ? (
                          <>
                            <MenuItem onClick={handleApprove}>
                              View Details
                            </MenuItem>
                          </>
                        ) : payment ? (
                          row.status === "pending" ||
                          row.status === "active" ? (
                            <>
                              <MenuItem onClick={handleModify}>
                                Approve
                              </MenuItem>
                              <MenuItem onClick={handleAction}>Reject</MenuItem>
                            </>
                          ) : null
                        ) : product ? (
                          <>
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            <MenuItem
                              onClick={() => handleRowDelete(row._id)}
                              style={{ color: "red" }}
                            >
                              Remove
                            </MenuItem>
                            {row.status !== "accepted" && (
                              <MenuItem onClick={handleApprove}>
                                Approve
                              </MenuItem>
                            )}
                            <MenuItem onClick={handleAction}>Reject</MenuItem>
                          </>
                        ) : (
                          <>
                            {" "}
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            {onDeleteRow && (
                              <MenuItem
                                onClick={() => handleRowDelete(row._id)}
                                style={{ color: "red" }}
                              >
                                Remove
                              </MenuItem>
                            )}
                          </>
                        )}
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        {!dashboard && totalCount > 0 && (
          <>
            {" "}
            <Divider />
            <Stack
              // padding={2}
              component="div"
              direction={"row"}
              justifyContent={
                selectedIds.length > 0 ? "space-between" : "flex-end"
              }
              alignItems="center"
            >
              {selectedIds.length > 0 && (
                <Stack direction="row" alignItems="center">
                  <Typography paddingRight={3}>
                    {`${selectedIds.length} item${
                      selectedIds.length > 1 ? "s" : ""
                    } selected`}
                  </Typography>
                  <StyledButton
                    variant="primary"
                    name="Delete"
                    onClick={() => handleDelete(selectedIds)}
                  />
                </Stack>
              )}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <TablePagination
                    component="div"
                    rowsPerPage={rowPerSize}
                    labelDisplayedRows={({ from, to }) =>
                      `${pageNo}-${Math.ceil(
                        totalCount / rowPerSize
                      )} of ${totalCount}`
                    }
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={({ onPageChange }) => (
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        marginLeft={2}
                      >
                        {" "}
                        <Box
                          onClick={pageNo > 1 ? pageDec : null}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: pageNo > 1 ? "pointer" : "not-allowed",
                            opacity: pageNo > 1 ? 1 : 0.5,
                            pointerEvents: pageNo > 1 ? "auto" : "none",
                          }}
                        >
                          <LeftIcon />{" "}
                        </Box>
                        <Box
                          onClick={
                            pageNo < Math.ceil(totalCount / rowPerSize)
                              ? pageInc
                              : null
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor:
                              pageNo < Math.ceil(totalCount / rowPerSize)
                                ? "pointer"
                                : "not-allowed",
                            opacity:
                              pageNo < Math.ceil(totalCount / rowPerSize)
                                ? 1
                                : 0.5,
                            pointerEvents:
                              pageNo < Math.ceil(totalCount / rowPerSize)
                                ? "auto"
                                : "none",
                          }}
                        >
                          {" "}
                          <RightIcon />{" "}
                        </Box>
                      </Stack>
                    )}
                  />
                </Box>
              </Stack>
            </Stack>
          </>
        )}
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
