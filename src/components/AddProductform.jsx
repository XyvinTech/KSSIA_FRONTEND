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
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
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
      setTags(products.tags);
    }
  }, [products, isUpdate, setValue, users]);
  const option =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user._id,
          label: `${user?.name?.first_name} ${user?.name?.middle_name} ${user?.name?.last_name}`,
        }))
      : [];

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };
  const handleTagAddition = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
        tags: tags,
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

                  <Stack direction="row" spacing={2}justifyContent="center">
                    <StyledInput
                      placeholder="Add Tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <Typography
                      onClick={handleTagAddition}
                      sx={{
                        width: "50%",
                        color: "#004797",
                        cursor: "pointer",
                    
                        fontSize: "0.9rem",
                        textDecoration: "none",
                      }}
                    >
                      + Add more
                    </Typography>
                  </Stack>
                  <Box mt={2}>
                    {tags?.map((tag, index) => (
                      <Stack
                        direction="row"
                        key={index}
                        alignItems="center"
                        sx={{
                          display: "inline-flex",
                          marginRight: 1,
                          padding: "5px 10px",
                          border: "1px solid #ccc",
                          borderRadius: "16px",
                        }}
                      >
                        <Typography variant="body2" mr={1}>
                          {tag}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleTagRemoval(tag)}
                          sx={{ padding: 0 }}
                        >
                          <CloseIcon sx={{ fontSize: "0.9rem" }} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Box>
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
