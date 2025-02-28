import { useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../ui/StyledButton";
import Dropzone from "../ui/Dropzone";
import { addMembersBulk } from "../api/members-api";
const BulkAddform = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFileUpload = (file) => {
    setFiles([file]);
  };

  const handleCancel = () => {
    setFiles([]);
  };

  const parseFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      const processPhoneNumbers = (row) => ({
        personal: row.personal ? `+91${row.personal}` : undefined,
        landline: row.landline ? `+91${row.landline}` : undefined,
        company_phone_number: row.company_phone_number
          ? `+91${row.company_phone_number}`
          : undefined,
        whatsapp_number: row.whatsapp_number
          ? `+91${row.whatsapp_number}`
          : undefined,
        whatsapp_business_number: row.whatsapp_business_number
          ? `+91${row.whatsapp_business_number}`
          : undefined,
      });

      const processData = (data) =>
        data.map((row) => {
          const result = {
            abbreviation: row.abbreviation || "",
            name: row.name || "",
            designation: row.designation || "",
            membership_id: row.membership_id || "",
            phone_numbers: processPhoneNumbers(row),
          };
          if (row.email && row.email.trim() !== "") {
            result.email = row.email.trim();
          }
          if (row.company_name && row.company_name.trim() !== "") {
            result.company_name = row.company_name.trim();
          }
          if (row.address && row.address.trim() !== "") {
            result.address = row.address.trim();
          }

          return result;
        });

      if (file.type === "text/csv") {
        const parsedData = Papa.parse(data, { header: true });
        const filteredData = parsedData.data.filter((row) =>
          Object.values(row).some((value) => value !== null && value !== "")
        );
        callback(processData(filteredData));
      } else if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const filteredData = jsonData.filter((row) =>
          Object.values(row).some((value) => value !== null && value !== "")
        );
        callback(processData(filteredData));
      }
    };

    if (file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const handleSave = async () => {
    if (files.length > 0) {
      const file = files[0]?.file;
      if (file) {
        parseFile(file, async (parsedData) => {
          if (parsedData && parsedData.length > 0) {
            try {
              setLoading(true);
              await addMembersBulk(parsedData);
              navigate("/members");
            } catch (error) {
              toast.error(error.message);
            } finally {
              setLoading(false);
            }
          }
        });
      } else {
        toast("No file found.");
      }
    } else {
      toast("No file uploaded yet!");
    }
  };

  return (
    <Box bgcolor={"white"}>
      <Box padding={9}>
        <Dropzone files={files} onFileUpload={handleFileUpload} />
        <Stack spacing={2} mt={4}>
          <Typography variant="h6">Instructions for bulk import:</Typography>
          <ul style={{ fontSize: "12px" }}>
            <li>Don't remove headers.</li>
            <li>Maximum of 50 entries allowed at a time.</li>
          </ul>
        </Stack>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
          <StyledButton
            name="Cancel"
            variant="secondary"
            style={{ width: "auto" }}
            onClick={handleCancel}
          >
            Cancel
          </StyledButton>
          <StyledButton
            name={loading ? "Saving..." : "Save"}
            variant="primary"
            style={{ width: "auto" }}
            onClick={handleSave}
          >
            Save
          </StyledButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default BulkAddform;
