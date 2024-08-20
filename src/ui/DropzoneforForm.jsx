import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Stack, Grid, styled } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const StyledDropzone = styled(Box)(({ isDragActive }) => ({
  backgroundColor: '#FFFFFF',
  border: `2px dashed ${isDragActive ? '#004797' : '#4A4647'}`,
  borderRadius: '8px',
  padding: '20px 20px 80px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border 0.24s ease-in-out',
  '&:hover': {
    borderColor: '#004797',
  },
}));

const IconBackground = styled(Box)({
  backgroundColor: '#FFFF',
  borderRadius: '50%',
  width: '100px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto 10px',
});

const UploadIcon = styled(UploadFileIcon)({
  fontSize: '48px',
  color: '#004797',
});

const DropzoneText = styled('p')({
  margin: 0,
  color: '#333',
});

const FileItem = styled(Box)({
  marginBottom: '15px',
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '4px',
  backgroundColor: 'white',
});

const FileImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'contain',
});

export default function DropZoneforForm({ onChange }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(newFiles);

    // Trigger onChange with the file object
    if (onChange) {
      onChange(newFiles[0]?.file);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <Stack spacing={2}>
        <StyledDropzone {...getRootProps()} isDragActive={isDragActive}>
          <input {...getInputProps()} />
          <IconBackground>
            <UploadIcon />
          </IconBackground>
          <DropzoneText>
            {isDragActive
              ? 'Drop the files here ...'
              : 'Click to upload or drag and drop (SVG, PNG, JPG or GIF (max. 3MB)'}
          </DropzoneText>
        </StyledDropzone>

        {files.length > 0 && (
          <Grid container spacing={2}>
            {files.map((fileObj, index) => (
              <Grid item xs={12} key={index}>
                <FileItem>
                  <div>{fileObj.file.name}</div>
                  {fileObj.file.type.startsWith('image/') && (
                    <FileImage src={fileObj.preview} alt={fileObj.file.name} />
                  )}
                </FileItem>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </>
  );
}
