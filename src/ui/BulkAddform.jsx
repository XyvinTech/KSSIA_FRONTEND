import React from "react";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import DropZone from "./Dropzone";

const BulkAddform = () => {
  return (
    <Box bgcolor={"white"}>
      <Box padding={9}>
        <DropZone />
        <Stack spacing={2} mt={4}>
          <Typography variant="h6">Instructions for bulk import:</Typography>
          <ul style={{ fontSize: "12px" }}>
            <li>RFID Field is mandatory.</li>
            <li> If any value is not present then please use hyphen ("-") than blank.</li>
            <li> Don't remove headers.</li>
            <li> Maximum of 50 entries allowed at a time.</li>
          </ul>
        </Stack>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Stack direction={"row"} spacing={2}width={'50%'}justifyContent={'end'}>
            <StyledButton
              name="Cancel"
              variant="secondary"
              style={{ width: "auto" }}
            >
              Cancel
            </StyledButton>
            <StyledButton
              name="Save"
              variant="primary"
              style={{ width: "auto" }}
            >
              Upload
            </StyledButton>
          </Stack>
      </Box>
    </Box>
  );
};

export default BulkAddform;
