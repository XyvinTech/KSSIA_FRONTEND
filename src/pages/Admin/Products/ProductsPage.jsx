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
import { toast } from "react-toastify";
import ProductReject from "../../../components/ProductReject";
import ProductDetail from "../../../components/ProductDetail";
import StyledFilter from "../../../ui/StyledFilter";
import ProductFilter from "../../../ui/ProductFilter";
import { getDwldProduct } from "../../../api/members-api";
import { generateExcel } from "../../../utils/generateExcel";
export default function MembersPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productId, setProductId] = useState(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const { deleteProducts, fetchProductById, products } = useProductsStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    date: "",
  });
  useEffect(() => {
    async function init() {
      try {
        let filter = {};
        if (search) {
          filter.search = search;
        }
        filter.limit = row;
        filter.pageNo = pageNo;
        if (filters.name) filter.name = filters.name;
        if (filters.status) filter.status = filters.status;
        if (filters.date) filter.date = filters.date;
        const response = await axiosInstance.get(CONSTANTS.PRODUCTS_API, {
          params: filter,
        });

        if (response.status !== 200) {
          return;
        }

        setProductData(response.data.data);
        setTotal(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    init();
  }, [isChange, pageNo, search, row, filters]);

  const handleApprove = async (id) => {
    await fetchProductById(id);
    setApproveOpen(true);
  };
  const handleCloseApprove = () => {
    setApproveOpen(false);
  };
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleCloseReject = (id) => {
    setRejectOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleReject = async (id) => {
    await fetchProductById(id);
    setRejectOpen(true);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  const handleProduct = () => {
    navigate(`/products/addproduct`);
  };
  const handleEdit = (id) => {
    navigate(`/products/addproduct`, {
      state: { productId: id, isUpdate: true },
    });
  };
  const handleRowDelete = async (id) => {
    setProductId(id);
    setRemoveOpen(true);
  };
  const handleRemove = async () => {
    try {
      await deleteProducts(productId);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleCloseDelete = () => {
    setRemoveOpen(false);
  };
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };
  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        await Promise.all(selectedRows?.map((id) => deleteProducts(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDownload = async () => {
    try {
      const data = await getDwldProduct();
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
                placeholder={"Search product"}
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
            <StyledTable
              columns={productColums}
              data={productData}
              onSelectionChange={handleSelectionChange}
              onDeleteRow={handleRowDelete}
              onDelete={handleDelete}
              onApprove={handleApprove}
              onAction={handleReject}
              onModify={handleEdit}
              totalCount={total}
              pageNo={pageNo}
              product
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
            />{" "}
            <RemoveProduct
              open={removeOpen}
              onClose={handleCloseDelete}
              onChange={handleRemove}
            />
            <ProductReject
              open={rejectOpen}
              onClose={handleCloseReject}
              data={products}
              onChange={handleChange}
            />
            <ProductDetail
              open={approveOpen}
              onClose={handleCloseApprove}
              data={products}
              onChange={handleChange}
              onDeny={handleReject}
            />
          </Box>
          <ProductFilter
            open={filterOpen}
            onClose={handleCloseFilter}
            onApply={handleApplyFilter}
          />
        </>
      </Box>
    </>
  );
}
