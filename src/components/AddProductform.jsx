import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../ui/StyledSelectField";
import axiosInstance from "../api/axios-interceptor";
import CONSTANTS from "../constants";
import { useNavigate } from "react-router-dom";

export default function Addproductform() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([]);
  const [users,setUsers] = useState([])

  useEffect(()=>{
    async function init(){
      const resp = await axiosInstance.get(CONSTANTS.MEMBERS_API);
      const refinedDat = resp.data.data.map(user=>(
        {
          label : user.name,
          value :user.id
        }
      ))
      
      setUsers(refinedDat)
    }
    init()
  },[])
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const onSubmit = async  (data) => {
    console.log("Form data:", data);
    try {
      data.seller_id =data.seller_id.value
      data.unit =data.unit.value
      delete data.seller
      delete data.mcq
      const response = await axiosInstance.post(CONSTANTS.PRODUCTS_API,data)
      if(response.status != 201) {
        // handle error 
        return
      } 
      navigate(`/products`);
    } catch (error) {
      console.log(error);
      
    }
  };

  const addPhoneNumber = () => {
    setAdditionalPhones([...additionalPhones, ""]);
  };
  return (
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
                    options={users}
                    {...field}
                  />
                  {errors.seller && (
                    <span style={{ color: "red" }}>{errors.seller.message}</span>
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
                  <StyledInput placeholder="Enter the Product name" {...field}/>
                  {errors.productname && (
                    <span style={{ color: "red" }}>{errors.productname.message}</span>
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
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Chief guest image here"
                    onChange={onChange}
                  />
                  {errors.photo && (
                    <span style={{ color: "red" }}>{errors.photo.message}</span>
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
                  <StyledInput placeholder="Add Description in less than 500 words" {...field}/>
                  {errors.desc && (
                    <span style={{ color: "red" }}>{errors.desc.message}</span>
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
                  <StyledInput placeholder="Rs 00" {...field}/>
                  {errors.actual && (
                    <span style={{ color: "red" }}>{errors.actual.message}</span>
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
                  <StyledInput placeholder="Rs 00" {...field}/>
                  {errors.offer && (
                    <span style={{ color: "red" }}>{errors.offer.message}</span>
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
              MCQ
            </Typography>
            <Controller
              name="mcq"
              control={control}
              defaultValue=""
              rules={{ required: "MCQ is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Value" {...field} />
                  {errors.mcq && (
                    <span style={{ color: "red" }}>{errors.mcq.message}</span>
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
              name="unit"
              control={control}
              defaultValue=""
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select the unit"
                    options={option}
                    {...field}
                  />
                  {errors.unit && (
                    <span style={{ color: "red" }}>{errors.unit.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
         
          <Grid item xs={6}></Grid> 
          <Grid item xs={6}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                style={{ width: "auto" }}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name="Save"
                variant="primary"
                type="submit"
                style={{ width: "auto" }}
              >
                Save
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}