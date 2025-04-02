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
import { upload } from "../api/admin-api";

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
  const [type, setType] = useState();
  const location = useLocation();
  const { productId, isUpdate } = location.state || {};
  const{userId}=location.state||{};
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
      const selectedCat = category.find(
        (cat) => cat?.value === products?.category
      );
      setValue("category", selectedCat || []);
      setType(products?.category);

      const selectedTags = products?.subcategory?.map((Id) =>
        tagOptions.find((option) => option?.value === Id)
      );
      setValue("tags", selectedTags || []);
    }
    else if (userId) {
      const defaultSeller = users.find((user) => user?._id === userId);
      if (defaultSeller) {
        setValue("seller_id", {
          value: defaultSeller._id,
          label: `${defaultSeller.abbreviation} ${defaultSeller.name}`,
        });
      }
    }
  }, [products, isUpdate, setValue, users, userId]);
  const option =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user._id,
          label: `${user?.abbreviation} ${user?.name} `,
        }))
      : [];
  const category = [
    { value: "Plastic Products", label: "Plastic Products" },
    { value: "Building Materials", label: "Building Materials" },
    { value: "Rubber Products", label: "Rubber Products" },
    { value: "Stationery", label: "Stationery" },
    { value: "Agricultural Products", label: "Agricultural Products" },
    { value: "Packing Materials", label: "Packing Materials" },
    { value: "Household Items", label: "Household Items" },
    { value: "Safety Products", label: "Safety Products" },
    { value: "Chemicals", label: "Chemicals" },
    { value: "Industrial Oils", label: "Industrial Oils" },
    { value: "Machinery", label: "Machinery" },
    { value: "Machine Shop", label: "Machine Shop" },
    { value: "Industrial Adhesive", label: "Industrial Adhesive" },
    { value: "Dresses", label: "Dresses" },
    { value: "Food Products", label: "Food Products" },
    { value: "Electroplating", label: "Electroplating" },
    { value: "Health Care Products", label: "Health Care Products" },
    { value: "Welding Materials", label: "Welding Materials" },
    { value: "Milk and Milk Products", label: "Milk and Milk Products" },
    { value: "Industrial Gas", label: "Industrial Gas" },
    { value: "Aluminium Products", label: "Aluminium Products" },
    { value: "Steel Products", label: "Steel Products" },
    { value: "Electrical Products", label: "Electrical Products" },
    { value: "Electronic Products", label: "Electronic Products" },
  ];

  const tagOptions = [
    {
      value: "Pipes and Fillings",
      label: "Pipes and Fillings",
      category: "Plastic Products",
    },
    {
      value: "Water Tanks",
      label: "Water Tanks",
      category: "Plastic Products",
    },
    { value: "Water Taps", label: "Water Taps", category: "Plastic Products" },
    {
      value: "Septic Tanks",
      label: "Septic Tanks",
      category: "Plastic Products",
    },
    { value: "Carbuoys", label: "Carbuoys", category: "Plastic Products" },
    {
      value: "Plastic Films",
      label: "Plastic Films",
      category: "Plastic Products",
    },
    { value: "Pots", label: "Pots", category: "Plastic Products" },
    {
      value: "Plasic Moulded Items",
      label: "Plasic Moulded Items",
      category: "Plastic Products",
    },
    {
      value: "Plastic Containers",
      label: "Plastic Containers",
      category: "Plastic Products",
    },

    { value: "Multiwood", label: "Multiwood", category: "Building Materials" },
    {
      value: "Door & Window Frames",
      label: "Door & Window Frames",
      category: "Building Materials",
    },
    {
      value: "Structural Building",
      label: "Structural Building",
      category: "Building Materials",
    },
    {
      value: "Designer Tiles and Paver Blocks",
      label: "Designer Tiles and Paver Blocks",
      category: "Building Materials",
    },
    {
      value: "Rolling Shutters",
      label: "Rolling Shutters",
      category: "Building Materials",
    },
    { value: "Paints", label: "Paints", category: "Building Materials" },
    { value: "Clay Tile", label: "Clay Tile", category: "Building Materials" },

    {
      value: "Tread Rubber",
      label: "Tread Rubber",
      category: "Rubber Products",
    },
    {
      value: "Rubber Moulds",
      label: "Rubber Moulds",
      category: "Rubber Products",
    },
    {
      value: "Conveyor belts",
      label: "Conveyor belts",
      category: "Rubber Products",
    },

    {
      value: "Printing Paper",
      label: "Printing Paper",
      category: "Stationery",
    },
    { value: "Writing Pen", label: "Writing Pen", category: "Stationery" },

    { value: "Manure", label: "Manure", category: "Agricultural Products" },
    {
      value: "Rainguard Materials",
      label: "Rainguard Materials",
      category: "Agricultural Products",
    },

    { value: "Catron Box", label: "Catron Box", category: "Packing Materials" },
    {
      value: "Plywood Packing",
      label: "Plywood Packing",
      category: "Packing Materials",
    },

    { value: "Chairs", label: "Chairs", category: "Household Items" },
    { value: "Pet Cages", label: "Pet Cages", category: "Household Items" },

    {
      value: "Cleaning Chemicals",
      label: "Cleaning Chemicals",
      category: "Chemicals",
    },
    {
      value: "Water Treatment Chemicals",
      label: "Water Treatment Chemicals",
      category: "Chemicals",
    },
    {
      value: "Industrial Chemicals",
      label: "Industrial Chemicals",
      category: "Chemicals",
    },
    {
      value: "Soaps and Detergents",
      label: "Soaps and Detergents",
      category: "Chemicals",
    },
    { value: "Varnishes", label: "Varnishes", category: "Chemicals" },
    { value: "Solvents", label: "Solvents", category: "Chemicals" },

    { value: "Machine Oil", label: "Machine Oil", category: "Industrial Oils" },
    {
      value: "Hydraulic Oil",
      label: "Hydraulic Oil",
      category: "Industrial Oils",
    },

    {
      value: "Food Processing Machinery",
      label: "Food Processing Machinery",
      category: "Machinery",
    },
    {
      value: "Electrical Machinery",
      label: "Electrical Machinery",
      category: "Machinery",
    },
    {
      value: "Crusher Machinery",
      label: "Crusher Machinery",
      category: "Machinery",
    },
    {
      value: "Packing Machines",
      label: "Packing Machines",
      category: "Machinery",
    },
    {
      value: "Industrial Heaters",
      label: "Industrial Heaters",
      category: "Machinery",
    },
    {
      value: "Industrial Ovens",
      label: "Industrial Ovens",
      category: "Machinery",
    },
    {
      value: "Clay Tile Machinery",
      label: "Clay Tile Machinery",
      category: "Machinery",
    },
    { value: "Wood Machines", label: "Wood Machines", category: "Machinery" },
    {
      value: "Printing Machinery",
      label: "Printing Machinery",
      category: "Machinery",
    },
    {
      value: "Boilers, Heaters, Chimneys",
      label: "Boilers, Heaters, Chimneys",
      category: "Machinery",
    },
    {
      value: "Rubber Machinery",
      label: "Rubber Machinery",
      category: "Machinery",
    },

    { value: "Dies", label: "Dies", category: "Machine Shop" },
    { value: "CNC Works", label: "CNC Works", category: "Machine Shop" },
    { value: "Lathe Work", label: "Lathe Work", category: "Machine Shop" },

    {
      value: "Packaged Food Products",
      label: "Packaged Food Products",
      category: "Food Products",
    },
    {
      value: "Packaged Snacks",
      label: "Packaged Snacks",
      category: "Food Products",
    },
    { value: "Cooking Oil", label: "Cooking Oil", category: "Food Products" },

    {
      value: "Cosmetic Products",
      label: "Cosmetic Products",
      category: "Health Care Products",
    },
    {
      value: "Ayurvedic Products",
      label: "Ayurvedic Products",
      category: "Health Care Products",
    },
    { value: "Soaps", label: "Soaps", category: "Health Care Products" },
    {
      value: "Tooth Paste",
      label: "Tooth Paste",
      category: "Health Care Products",
    },

    {
      value: "Electrical Switches",
      label: "Electrical Switches",
      category: "Electrical Products",
    },
    {
      value: "Pannel Boards",
      label: "Pannel Boards",
      category: "Electrical Products",
    },
    {
      value: "Earthing Equipments",
      label: "Earthing Equipments",
      category: "Electrical Products",
    },
    {
      value: "Wiring Cables",
      label: "Wiring Cables",
      category: "Electrical Products",
    },
  ];
  const filteredTagOptions = tagOptions?.filter(
    (tag) => tag?.category === type
  );
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
    setValue("tags", []);
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.image || "";

    if (imageFile) {
        try {
          imageUrl = await new Promise(async (resolve, reject) => {
            try {
              const response = await upload(imageFile);
              resolve(response?.data || "");
            } catch (error) {
              reject(error);
            }
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
        category: type,
        subcategory: data?.tags.map((i) => i.value),
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
                    Category
                  </Typography>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          placeholder="Select the category"
                          options={category}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTypeChange(e);
                          }}
                        />
                        {errors.type && (
                          <span style={{ color: "red" }}>
                            {errors.type.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>
                {filteredTagOptions?.length > 0 && (
                  <Grid item xs={12}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Add Subcategory
                    </Typography>

                    <Controller
                      name="tags"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <>
                          <StyledSelectField
                            placeholder="Select Tag"
                            options={filteredTagOptions}
                            isMulti
                            {...field}
                          />
                        </>
                      )}
                    />
                  </Grid>
                )}
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
