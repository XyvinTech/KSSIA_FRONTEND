import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../ui/StyledButton";
import PromotionItems from "../../../components/PromotionItems";
export default function Promotionpage() {
  const navigate = useNavigate();

  const handleView2 = (id) => {
    navigate(`/promotions/createpromotion`);
  };
 
  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"#4A4647"}>
              Promotions
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <StyledButton
                name="Create promotion"
                variant="primary"
                onClick={handleView2}
              >
                Create promotion
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <>
        <PromotionItems />
      </>
    </>
  );
}
