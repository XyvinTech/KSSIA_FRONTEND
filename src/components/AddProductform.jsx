import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, Skeleton } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import axiosInstance from "../api/axios-interceptor";
import CONSTANTS from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useDropDownStore } from "../store/dropDownStore";
import { useProductsStore } from "../store/productStore";
import { toast } from "react-toastify";

export default function Addproductform() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { addProducts, fetchProductById, updateProduct, products, loadings } =
    useProductsStore();
  const [loading, setLoading] = useState(false);
  const { users, fetchUsers } = useDropDownStore();

  const location = useLocation();
  const { productId, isUpdate } = location.state || {};
  useEffect(() => {
    let filter = {};
    filter.limit = "full";
    fetchUsers(filter);
  }, []);
  useEffect(() => {
    if (isUpdate && productId) {
      fetchProductById(productId);
    }
  }, [productId, isUpdate, fetchProductById]);
  useEffect(() => {
    if (products && isUpdate) {
      setValue("productname", products.name);
      setValue("description", products.description);
      setValue("price", products.price);
      setValue("offer_price", products.offer_price);
      setValue("units", products.units);
      setValue("image", products.image);
      const sellerUser = users.find(
        (user) => user?._id === products.seller_id?._id
      );
      if (sellerUser) {
        setValue("seller_id", {
          value: sellerUser._id,
          label: `${sellerUser.name.first_name} ${sellerUser.name.middle_name} ${sellerUser.name.last_name}`,
        });
      }
    }
  }, [products, isUpdate, setValue, users]);
  const option =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user._id,
          label: `${user.name.first_name} ${user.name.middle_name} ${user.name.last_name}`,
        }))
      : [];

  const handleClear = (event) => {
    event.preventDefault();
    reset();
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("seller_id", data?.seller_id.value);
      formData.append("description", data?.description);
      formData.append("offer_price", data?.offer_price);
      formData.append("price", data?.price);
      formData.append("units", data?.units);
      if (!isUpdate || (isUpdate && data.file instanceof File)) {
        formData.append("image", data.image);
      }
      formData.append("name", data?.productname);
      if (isUpdate && productId) {
        await updateProduct(productId, formData);
      } else {
        await addProducts(formData);
      }
      navigate(`/products`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadings ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"800px"}
          sx={{ bgcolor: "white" }}
        />
      ) : (
        <>
          <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Name of the Seller
                  </Typography>
                  <Controller
                    name="seller_id"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Seller name is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          placeholder="Enter Seller name"
                          options={option}
                          {...field}
                        />
                        {errors.seller && (
                          <span style={{ color: "red" }}>
                            {errors.seller.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Name of the product
                  </Typography>
                  <Controller
                    name="productname"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Product Name is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder="Enter the Product name"
                          {...field}
                        />
                        {errors.productname && (
                          <span style={{ color: "red" }}>
                            {errors.productname.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Product image
                  </Typography>
                  <Controller
                    name="image"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <>
                        <StyledEventUpload
                          label="Upload Product Image"
                          onChange={field.onChange}
                          value={field.value}
                        />
                        {errors.photo && (
                          <span style={{ color: "red" }}>
                            {errors.photo.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Description
                  </Typography>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Product Name is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder="Add Description in less than 500 words"
                          {...field}
                        />
                        {errors.desc && (
                          <span style={{ color: "red" }}>
                            {errors.desc.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Actual price
                  </Typography>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Actual price  is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput placeholder="Rs 00" {...field} />
                        {errors.actual && (
                          <span style={{ color: "red" }}>
                            {errors.actual.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Offer price
                  </Typography>
                  <Controller
                    name="offer_price"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Offer price  is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput placeholder="Rs 00" {...field} />
                        {errors.offer && (
                          <span style={{ color: "red" }}>
                            {errors.offer.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Per Unit
                  </Typography>
                  <Controller
                    name="units"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <>
                        <StyledInput placeholder="Select the unit" {...field} />
                        {errors.unit && (
                          <span style={{ color: "red" }}>
                            {errors.unit.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={6}></Grid>
                <Grid item xs={6} display={"flex"} justifyContent={"end"}>
                  {" "}
                  <Stack direction={"row"} spacing={2}>
                    <StyledButton
                      name="Cancel"
                      variant="secondary"
                      onClick={(event) => handleClear(event)}
                      style={{ width: "auto" }}
                    >
                      Cancel
                    </StyledButton>
                    <StyledButton
                      name={loading ? "Saving..." : "Save"}
                      variant="primary"
                      type="submit"
                    >
                      Save
                    </StyledButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </Box>
        </>
      )}
    </>
  );
}
