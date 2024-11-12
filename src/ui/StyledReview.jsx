import React from "react";
import { Box, Grid, Rating, Stack, Typography, Avatar } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

const StyledReviewContainer = styled(Grid)`
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const ReviewerName = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c2829;
`;

const ReviewContent = styled(Typography)`
  font-size: 0.95rem;
  color: #5f6368;
  margin-top: 8px;
`;

const ReviewDate = styled(Typography)`
  font-size: 0.85rem;
  color: #b5b8c5;
  margin-top: 4px;
`;

const StyledReview = ({ review }) => {
  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };

  return (
    <StyledReviewContainer container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {review?.reviewer?.profile_picture && (
            <Avatar src={review?.reviewer?.profile_picture} alt="Profile Picture" />
          )}
          <ReviewerName variant="h6">
            {review?.reviewer?.name?.first_name} {review?.reviewer?.name?.middle_name} {review?.reviewer?.name?.last_name}
          </ReviewerName>
          <Box flexGrow={1} />
          <ReviewDate>{formatDate(review?.created_at || "")}</ReviewDate>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Rating name="read-only" value={review?.rating} readOnly />
        </Stack>
        <ReviewContent>{review?.content}</ReviewContent>
        
      </Grid>
    </StyledReviewContainer>
  );
};

export default StyledReview;
