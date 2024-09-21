import React from "react";
import { Grid } from "@mui/material";
import LogoutScreen from "../../../ui/LogoutScreen";

export default function LogoutPage() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
      marginTop={-5}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LogoutScreen />
      </Grid>
    </Grid>
  );
}
