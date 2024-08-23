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
import RemoveProduct from "../../../components/Removeproduct";
import { useProductsStore } from "../../../store/productStore";
export default function MembersPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productId, setProductId] = useState(null);
  const { deleteProducts } = useProductsStore();
  useEffect(() => {
    async function init() {
      const response = await axiosInstance.get(CONSTANTS.PRODUCTS_API);
      if (response.status != 200) {
        // handle return
        return;
      }
      setProductData(response.data.data);
    }
    init();
  }, [isChange]);

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
  const handleEdit = (id) => {
    navigate(`/products/addproduct`, { state: { productId: id, isUpdate: true } });
  };
  const handleRowDelete = async (id) => {
    setProductId(id);
    setRemoveOpen(true);
  };
  const handleRemove = async () => {
    await deleteProducts(productId);
    setIsChange(!isChange);
  };
  const handleCloseDelete = () => {
    setRemoveOpen(false);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteProducts(id)));
      setIsChange(!isChange);
      setSelectedRows([]);
    }
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
              onDeleteRow={handleRowDelete}
              onDelete={handleDelete}
              onModify={handleEdit}
            />{" "}
            <RemoveProduct
              open={removeOpen}
              onClose={handleCloseDelete}
              onChange={handleRemove}
            />
          </Box>
        </>
      </Box>
    </>
  );
}
