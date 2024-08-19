import React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.2)',
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(0, 0, 0, 0.2)',
            opacity: 1,
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
});

export const StyledCalender = ({ label, value, onChange, placeholder }) => {
  const handleDateChange = (date) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={value ? new Date(value) : null} // Ensure value is a Date object
          onChange={handleDateChange}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder={placeholder}
            />
          )}
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

