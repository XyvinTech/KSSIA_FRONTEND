import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import Addproductform from "../../../components/AddProductform.jsx";

export default function AddProductSinglepage() {
  return (
    <>
      <Box padding={"10px"} bgcolor={"#FFFFFF"}height={'70px'}display={'flex'}alignItems={'center'}>
        <Typography variant="h4" color={"#4A4647"}>
          Add product
        </Typography>
      </Box>
      {/* <Box padding="30px" marginBottom={4}>
        <Box>
        <Addproductform/>
        </Box>
        </Box> */}
      <Grid container spacing={1} item xs={12}>
        <Grid item xs={12}>
          <Box paddingRight={20} paddingTop={5} paddingLeft={4}>
            <Addproductform />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
