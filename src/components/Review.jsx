import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import StyledReview from "../ui/StyledReview";
import styled from "styled-components";

const StyledNoReviewsMessage = styled(Typography)`
  font-size: 1.2rem;
  color: #a0a0a0;
  font-weight: 500;
  text-align: center;
  margin-top: 16px;
`;

const ReviewContainer = styled(Grid)`
  padding: 16px;
  border-radius: 12px;
  background-color: #f7f7f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Review = ({ data }) => {
  return (
    <ReviewContainer container item xs={12}>
      {data?.length > 0 ? (
        <Grid container spacing={5} pt={2}>
          {data.map((review) => (
            <Grid item md={6} xs={12} key={review?.id}>
              <StyledReview review={review} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box width="100%" display="flex" justifyContent="center">
          <StyledNoReviewsMessage>No reviews available</StyledNoReviewsMessage>
        </Box>
      )}
    </ReviewContainer>
  );
};

export default Review;
