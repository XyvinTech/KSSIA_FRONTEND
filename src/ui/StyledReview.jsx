import React from "react";
import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { ReactComponent as DeleteIcon } from "../assets/icons/DeleteIcon.svg";
import moment from "moment";

const StyledReview = ({ review }) => {
  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" fontWeight={400} color={"#2C2829"}>
              {review?.reviewer?.name?.first_name}  {review?.reviewer?.name?.middle_name}  {review?.reviewer?.name?.last_name}
            </Typography>
            <Rating name="read-only" value={review?.rating} readOnly />
            {/* <Box flexGrow={1} />
            <DeleteIcon /> */}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h7" fontWeight={400} color={"#B5B8C5"}>
              {review?.content}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" color={"#2C2829"} fontWeight={400}>
              {formatDate(review?.created_at || "")}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default StyledReview;
