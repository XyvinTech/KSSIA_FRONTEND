import React, { useState } from "react";
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
} from "@mui/material";
import { ReactComponent as ViewIcon } from "../assets/icons/ViewIcon.svg";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledButton } from "./StyledButton";

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
  onDeleteRow,
  dashboard,
  member,
  payment,
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

  const handleRowClick = (id) => {
    onView(id);
  };

  const isSelected = (id) => selectedIds.includes(id);

  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "green" : "rejected";
    }
    switch (status) {
      case "active":
        return "green";
      case "premium":
        return "orange";
      case "free":
        return "mint";
      case "pending":
        return "#BFBABA";
      case "upcoming":
        return "#0072BC";
      case "ongoing":
        return "green";
      case "closed":
        return "#938F8F";
      case "completed":
        return "#2E7D32";
      case "live":
        return "red";
      case "Recording Available":
        return "green";
      case "published":
        return "green";
      case "draft":
        return "#BFBABA";
      default:
        return "default";
    }
  };
  console.log('dddddddddd',columns)
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
            {data &&
              Array.isArray(data) &&
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
                        "banner_image_url",
                        "image",
                        "event image",
                      ].includes(column.field) ? (
                        <img
                          src={row[column.field]}
                          alt={column.title}
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : column.field === "status" ? (
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
                            {row[column.field]}
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
                          onClick={()=>handleView(row._id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}{" "}
                      {!menu && (
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
                        ) : member ? (
                          <>
                            <MenuItem onClick={handleView}>
                              View Details
                            </MenuItem>
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            <MenuItem onClick={handleAction}>Suspend</MenuItem>
                            <MenuItem
                              onClick={handleDelete}
                              style={{ color: "red" }}
                            >
                              Delete
                            </MenuItem>
                          </>
                        ) : payment ? (
                          <>
                            <MenuItem onClick={handleModify}>Approve</MenuItem>
                            <MenuItem onClick={handleAction}>Reject</MenuItem>
                          </>
                        ) : (
                          <>
                            {" "}
                            <MenuItem onClick={handleModify}>Edit</MenuItem>
                            <MenuItem
                              onClick={() => handleRowDelete(row._id)}
                              style={{ color: "red" }}
                            >
                              Remove
                            </MenuItem>
                          </>
                        )}
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Divider />
        {!dashboard && (
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
                  count={data ? data.length : 0}
                  rowsPerPage={10}
                  page={0}
                  onPageChange={() => {}}
                  ActionsComponent={({ onPageChange }) => (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      marginLeft={2}
                    >
                      <LeftIcon />
                      <RightIcon />
                    </Stack>
                  )}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
