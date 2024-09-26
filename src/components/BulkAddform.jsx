import { useState, useCallback } from "react";
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
    console.log("Parsed Data:", file);
  };

  const handleCancel = () => {
    setFiles([]);
  };

  const parseFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      if (file.type === "text/csv") {
        const parsedData = Papa.parse(data, { header: true });
        const filteredData = parsedData.data.filter((row) =>
          Object.values(row).some((value) => value !== null && value !== "")
        );
        const splitFullName = (fullName) => {
          const titles = ["Mr.", "Mrs.", "Dr.", "Miss", "Ms."];
          const nameParts = fullName
            .split(" ")
            .filter((part) => !titles.includes(part));

          let firstName = "";
          let middleName = "";
          let lastName = "";

          if (nameParts.length === 1) {
            firstName = nameParts[0];
          } else if (nameParts.length === 2) {
            firstName = nameParts[0];
            lastName = nameParts[1];
          } else if (nameParts.length > 2) {
            firstName = nameParts[0];
            middleName = nameParts.slice(1, nameParts.length - 1).join(" ");
            lastName = nameParts[nameParts.length - 1];
          }

          return {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
          };
        };
        const formatPhoneNumber = (phoneNumber) => {
          if (phoneNumber.startsWith("+91")) {
            return phoneNumber;
          }
          return `+91${phoneNumber}`;
        };
        const formattedData = filteredData.map((row) => ({
          name: splitFullName(row["Name"]),
          email: row["Email ID"] || "",
          phone_numbers: {
            personal: formatPhoneNumber(row["Mobile Number"] || ""),
            whatsapp_number: formatPhoneNumber(row["WhatsApp Number"] || ""),
          },
          designation: row["Designation"] || "",
          membership_id: row["MemberShip ID"] || "",
        }));
        callback(formattedData);
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
        const formattedData = filteredData.map((row) => ({
          name: {
            first_name: row["Name"].split(" ")[1] || "",
            middle_name: "",
            last_name: row["Name"].split(" ").slice(2).join(" ") || "",
          },
          email: row["Email ID"] || "",
          phone_numbers: {
            personal: row["Mobile Number"] || "",
            whatsapp_number: row["WhatsApp Number"] || "",
          },
          designation: row["Designation"] || "",
          membership_id: row["MemberShip ID"] || "",
        }));
        callback(formattedData);
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
