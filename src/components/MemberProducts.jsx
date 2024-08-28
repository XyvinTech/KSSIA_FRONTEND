import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

import { productColums} from "../assets/json/TableData";
import { StyledButton } from "../ui/StyledButton";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
import axiosInstance from "../api/axios-interceptor";
import CONSTANTS from "../constants";

export default function MembersProducts({id}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [products,setProducts] = useState([])
  useEffect(()=>{
    async function init(){

      const response =  await axiosInstance.get(`${CONSTANTS.SELLER_PRODUCTS_API}/${id}`)
      if(response.status != 200){
        // handle error
        return
      }
      setProducts(response.data.data);
    }
    init()
  },[])
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  return (
    <>
      {" "}
      <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
              <Stack>
                <StyledSearchbar />
              </Stack>
              <Stack>
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
              <Stack>
                <StyledButton name="Download" variant="third">
                  Download
                </StyledButton>
              </Stack>
              <Stack>
                <StyledButton name="Add product" variant="primary">
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
            <StyledTable
              columns={productColums}
              data={products}
             menu
            />{" "}
          </Box>
        </>
    </>
  );
}
