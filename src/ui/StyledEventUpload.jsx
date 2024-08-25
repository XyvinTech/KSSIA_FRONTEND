import React, { useRef, useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.2)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(0, 0, 0, 0.2)',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(0, 0, 0, 0.2)',
    opacity: 1,
  },
}));

const PreviewContainer = styled(Box)({
  width: '100%',
  height: '200px',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
});

export const StyledEventUpload = ({ label, placeholder, onChange, value }) => {
  const fileInputRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (value && typeof value === "string") {
      setFilePreview(value);
      setFileType(value.split('.').pop().toLowerCase() === 'mp4' ? 'video' : 'image');
    }
  }, [value]);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileType(file.type.split("/")[0]); 
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
        onChange(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <CustomTextField
        fullWidth
        label={label}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <BackupOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
          value: value ? "File Selected" : "",
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*, video/*"
      />
      {filePreview && (
        <PreviewContainer>
          {fileType === "image" ? (
            <Box
              component="img"
              src={filePreview}
              alt="preview"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          ) : (
            <Box
              component="video"
              controls
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            >
              <source src={filePreview} type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          )}
        </PreviewContainer>
      )}
    </>
  );
};

