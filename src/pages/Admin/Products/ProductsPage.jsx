import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { productColums, userData } from "../../../assets/json/TableData";
import axiosInstance from "../../../api/axios-interceptor";
import CONSTANTS from "../../../constants";
export default function MembersPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    async function init() {
      const response = await axiosInstance.get(CONSTANTS.PRODUCTS_API);
      if (response.status != 200) {
        // handle return
        return;
      }
      console.log(response.data.data);
      setProductData(response.data.data);
    }
    init();
  }, []);
  const handleDelete = async (id) => {
    const resp = await axiosInstance.delete(`${CONSTANTS.PRODUCTS_API}/${id}`);

    if (resp.status != 200) {
      // handle error
      return;
    }
    setProductData((products) =>
      products.filter((product) => product.id != id)
    );
  };
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  const handleProduct = () => {
    navigate(`/products/addproduct`);
  };
  const handleEdit = () => {
    navigate(`/products/addproduct`);
  };
  // const handleDelete = () => {
  //   setRemoveOpen(true);
  // };
  const handleCloseDelete = () => {
    setRemoveOpen(false);
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
              Products
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
                name="Add Product"
                variant="primary"
                onClick={handleProduct}
              >
                Add Product
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
              columns={productColums}
              data={productData}
              onSelectionChange={handleSelectionChange}
              onDelete={handleDelete}
              // onView={handleView}
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
}
