import React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from 'moment';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.2)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.2)",
          "&.Mui-focused": {
            color: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(0, 0, 0, 0.2)",
            opacity: 1,
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  "& .MuiInputBase-input::label": {
    color: "rgba(0, 0, 0, 0.2)",
    opacity: 1,
  },
});

export const StyledTime = ({ label, placeholder, onChange, value }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    value ? moment(value).toDate() : null
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(moment(value).toDate());
    }
  }, [value]);

  const handleDateChange = (date) => {
    const isoDate = moment(date).toISOString(); 
    setSelectedDate(date);
    if (onChange) {
      onChange(isoDate); 
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <CustomTextField {...params} placeholder={placeholder} />
          )}
          sx={{ width: "100%" }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
