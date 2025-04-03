import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import AddRequirement from "../../../components/AddRequirement";

export default function AddRequirementPage() {
  return (
    <>
      <Box padding={"10px"} bgcolor={"#FFFFFF"}height={'70px'}display={'flex'}alignItems={'center'}>
        <Typography variant="h4" color={"#4A4647"}>
          Add Requirement
        </Typography>
      </Box>
      <Grid container spacing={1} item xs={12}>
        <Grid item xs={8}>
          <Box padding={'15px'}>
            <AddRequirement />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
