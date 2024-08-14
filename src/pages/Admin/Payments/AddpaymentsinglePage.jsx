import React from "react";

import { Box, Grid, Typography } from "@mui/material";

import AddPaymentdetails from "../../../components/AddPaymentdetails.jsx";

export default function AddpaymentsinglePage() {
  return (
    <>
      <Box
        padding={"20px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Payments list / Add Payment details
        </Typography>
      </Box>
      {/* <Box padding="30px" marginBottom={4}>
        <Box>
        <Addproductform/>
        </Box>
        </Box> */}
      {/* <Grid container spacing={1} item xs={12}>
        <Grid item xs={12}>
     <Box paddingRight={20} paddingTop={5} paddingLeft={5}>
      <AddPaymentdetails/>
      </Box>

     </Grid>
     
        </Grid> */}
      <Grid container>
        <Grid item md={9} paddingTop={5} paddingLeft={5}>
          <AddPaymentdetails />
        </Grid>
      </Grid>
    </>
  );
}
