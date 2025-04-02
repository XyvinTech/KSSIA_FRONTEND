import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import { productColums } from "../assets/json/TableData";
import { StyledButton } from "../ui/StyledButton";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import axiosInstance from "../api/axios-interceptor";
import CONSTANTS from "../constants";
import { useNavigate } from "react-router-dom";

export default function MembersProducts({ id }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function init() {
      const response = await axiosInstance.get(
        `${CONSTANTS.SELLER_PRODUCTS_API}/${id}`
      );
      if (response.status != 200) {
        // handle error
        return;
      }
      setProducts(response.data.data);
    }
    init();
  }, []);


  return (
    <>
      {" "}
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <Stack>
              <StyledButton
                name="Add product"
                variant="primary"
                onClick={() => navigate(`/products/addproduct`, { state: { userId:id } })}
              >
                Add product
              </StyledButton>
            </Stack>
          </Stack>
        </Stack>{" "}
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable columns={productColums} data={products} menu />{" "}
        </Box>
      </>
    </>
  );
}
