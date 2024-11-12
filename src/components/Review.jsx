import React from "react";
import { Grid, Typography } from "@mui/material";
import reviews from "../assets/json/ReviewData";
import StyledReview from "../ui/StyledReview";

const Review = ({ data }) => {
  return (
    <Grid container item xs={12} padding={2} borderRadius={"12px"}>
      {data && data?.length > 0 && (
        <Typography
          variant="h6"
          color={"#2C2829"}
          fontWeight={700}
          sx={{ padding: "0 0 16px 0", fontSize: 16 }}
        >
          Member reviews
        </Typography>
      )}

      <Grid container spacing={5} pt={2}>
        {data?.map((review) => (
          <Grid item md={6} xs={12} key={review?.id} spacing={2}>
            <StyledReview review={review} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Review;
