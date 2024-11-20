import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Skeleton,
  FormHelperText,
  IconButton,
} from "@mui/material";

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
import uploadFileToS3 from "../utils/s3Upload";
import CloseIcon from "@mui/icons-material/Close";

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
  const [imageFile, setImageFile] = useState(null);
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
          label: `${sellerUser.abbreviation} ${sellerUser.name}`,
        });
      }
      const selectedTags = products?.tags?.map((Id) =>
        tagOptions.find((option) => option?.value === Id)
      );
      setValue("tags", selectedTags || []);
    }
  }, [products, isUpdate, setValue, users]);
  const option =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user._id,
          label: `${user?.abbreviation} ${user?.name} `,
        }))
      : [];
  const tagOptions = [
    { value: "Pipes and Fillings", label: "Pipes and Fillings" },
    { value: "Water Tanks", label: "Water Tanks" },
    { value: "Water Taps", label: "Water Taps" },
    { value: "Septic Tanks", label: "Septic Tanks" },
    { value: "Carbuoys", label: "Carbuoys" },
    { value: "Garden Hoses", label: "Garden Hoses" },
    { value: "Chairs", label: "Chairs" },
    { value: "Printing Machinery", label: "Printing Machinery" },
    { value: "Printing Work", label: "Printing Work" },
    { value: "Multiwood", label: "Multiwood" },
    { value: "Films", label: "Films" },
    { value: "Adhesive Tapes", label: "Adhesive Tapes" },
    { value: "Packing Materials", label: "Packing Materials" },
    { value: "Packing Containers", label: "Packing Containers" },
    { value: "Moulds", label: "Moulds" },
    { value: "Bucket and Cups", label: "Bucket and Cups" },
    { value: "Household Items", label: "Household Items" },
    { value: "Rainguard Materials", label: "Rainguard Materials" },
    { value: "Pots", label: "Pots" },
    { value: "Safety Products", label: "Safety Products" },
    { value: "Tread Rubber", label: "Tread Rubber" },
    { value: "Balloons", label: "Balloons" },
    { value: "Gloves", label: "Gloves" },
    { value: "Rubber Moulds", label: "Rubber Moulds" },
    { value: "Dies", label: "Dies" },
    { value: "CNC Works", label: "CNC Works" },
    { value: "Cleaning Chemicals", label: "Cleaning Chemicals" },
    { value: "Water Treatment Chemicals", label: "Water Treatment Chemicals" },
    { value: "Soaps and Detergents", label: "Soaps and Detergents" },
    { value: "Paints", label: "Paints" },
    { value: "Varnishes", label: "Varnishes" },
    { value: "Solvents", label: "Solvents" },
    { value: "Process Oil", label: "Process Oil" },
    { value: "Machine Oil", label: "Machine Oil" },
    { value: "Hydraulic Oil", label: "Hydraulic Oil" },
    { value: "Carton Box", label: "Carton Box" },
    { value: "Plywood Packing", label: "Plywood Packing" },
    { value: "Boilers", label: "Boilers" },
    { value: "Industrial Gas", label: "Industrial Gas" },
    { value: "Rolling Shutters", label: "Rolling Shutters" },
    { value: "Industrial Adhesive", label: "Industrial Adhesive" },
    { value: "Door & Window Frames", label: "Door & Window Frames" },
    { value: "Structural Building", label: "Structural Building" },
    { value: "Writing Pen", label: "Writing Pen" },
    { value: "Dresses", label: "Dresses" },
    { value: "Packing Machines", label: "Packing Machines" },
    {
      value: "Designer Tiles and Paver Blocks",
      label: "Designer Tiles and Paver Blocks",
    },
    { value: "Crusher Machinery", label: "Crusher Machinery" },
    { value: "Industrial Heaters", label: "Industrial Heaters" },
    { value: "Industrial Ovens", label: "Industrial Ovens" },
    { value: "Food Processing Machinery", label: "Food Processing Machinery" },
    { value: "Electrical Machinery", label: "Electrical Machinery" },
    { value: "Electroplating", label: "Electroplating" },
    { value: "Rubber Reclaim", label: "Rubber Reclaim" },
    { value: "Food Products", label: "Food Products" },
    { value: "Packaged Snacks", label: "Packaged Snacks" },
    { value: "Lathe Work", label: "Lathe Work" },
    { value: "Cosmetic Products", label: "Cosmetic Products" },
    { value: "Ayurvedic Products", label: "Ayurvedic Products" },
    { value: "Healthcare Products", label: "Healthcare Products" },
    { value: "Rubber Machinery", label: "Rubber Machinery" },
    { value: "Clay Tile", label: "Clay Tile" },
    { value: "Clay Tile Machinery", label: "Clay Tile Machinery" },
    { value: "Irrigation Pipes", label: "Irrigation Pipes" },
    { value: "Pet Cages", label: "Pet Cages" },
    { value: "Rubber Products", label: "Rubber Products" },
    { value: "Plastic Containers", label: "Plastic Containers" },
    { value: "Welding Materials", label: "Welding Materials" },
    { value: "Wiring Cables", label: "Wiring Cables" },
    { value: "Milk and Milk Products", label: "Milk and Milk Products" },
    { value: "Plastic Moulded Items", label: "Plastic Moulded Items" },
    { value: "Manure", label: "Manure" },
    { value: "Nails", label: "Nails" },
    { value: "Aluminium Products", label: "Aluminium Products" },
  ];

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.image || "";

      if (imageFile) {
        try {
          imageUrl = await new Promise((resolve, reject) => {
            uploadFileToS3(
              imageFile,
              (location) => resolve(location),
              (error) => reject(error)
            );
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return;
        }
      }
      const formData = {
        seller_id: data?.seller_id.value,
        description: data?.description,
        offer_price: data?.offer_price,
        price: data?.price,
        units: data?.units,
        image: imageUrl,
        tags: data?.tags.map((i) => i.value),
        name: data?.productname,
      };
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
                    render={({ field: { onChange, value } }) => (
                      <>
                        <StyledEventUpload
                          label="Upload Product Image"
                          onChange={(file) => {
                            setImageFile(file);
                            onChange(file);
                          }}
                          value={value}
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
                    Add Tags
                  </Typography>

                  <Controller
                    name="tags"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          placeholder="Select Tag"
                          options={tagOptions}
                          isMulti
                          {...field}
                        />
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
                    rules={{ required: "Units is required" }}
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
