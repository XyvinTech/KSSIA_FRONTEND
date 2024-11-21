import React from "react";
import { Box, Grid, Rating, Stack, Typography, Avatar } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

const StyledReviewContainer = styled(Grid)`
  padding-top: 16px;
  border-radius: 8px; 
`;

const ReviewerName = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: #616161;
`;

const ReviewContent = styled(Typography)`
  font-size: 14px;
  color: #343434;
  margin-top: 8px;
  margin-left: 46px;
`;

const ReviewDate = styled(Typography)`
  font-size: 10px;
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
            <Avatar
              src={review?.reviewer?.profile_picture}
              alt="Profile Picture"
              sx={{ width: "34px", height: "34px" }}
            />
          )}
          <ReviewerName>
            {review?.reviewer?.name?.first_name}{" "}
            {review?.reviewer?.name?.middle_name}{" "}
            {review?.reviewer?.name?.last_name}
          </ReviewerName>{" "}
          <Rating name="read-only" value={review?.rating} readOnly size="small" />
          <Box flexGrow={1} />
          <ReviewDate>{formatDate(review?.created_at || "")}</ReviewDate>
        </Stack>
        <ReviewContent>{review?.content}</ReviewContent>
      </Grid>
    </StyledReviewContainer>
  );
};

export default StyledReview;
