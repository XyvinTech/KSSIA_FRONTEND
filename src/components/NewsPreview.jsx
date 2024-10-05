import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";

import { useNewsStore } from "../store/newsStore";

const NewsPreview = ({ open, onClose, onChange, data, onEdit }) => {
  const { handleSubmit } = useForm();
  const { updateNews } = useNewsStore();

  const onSubmit = async () => {
    try {
      const newPublishedStatus = !data.published;

      const formData = new FormData();

      formData.append("published", newPublishedStatus);
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("content", data.content);
      

      await updateNews(data._id, formData);

      onChange();
      onClose();
    } catch (error) {
      console.error("Failed to update news", error);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };
  const handleEdit = (event) => {
    event.preventDefault();
    onEdit();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose} maxWidth={"md"}
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ height: "auto", padding: 3 }}>
          <Box display="flex" justifyContent="end" alignItems="center">
            <Typography
              onClick={(event) => handleClear(event)}
              color="#E71D36"
              style={{ cursor: "pointer" }}
            >
              <CloseIcon />
            </Typography>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ height: "auto", padding: 0 }}>
          <Stack spacing={2} padding={2} justifyContent={"center"}>
            <Box display={"flex"} justifyContent={"center"}>
            <img src={data?.image} width={"461px"} height={"262px"} /></Box>
            <Typography variant="h5" color={"#2C2829"}>
              {data?.title}
            </Typography>
            <Typography variant="h6" color={"#4A4647"}>
              {data?.category}
            </Typography>
            <Typography variant="h6" color={"#4A4647"}>
              {data?.content}
            </Typography>
          </Stack>{" "}
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Edit"
            onClick={(event) => handleEdit(event)}
          />
          <StyledButton
            variant="primary"
            name={data?.published ? "Unpublish" : "Publish"}
            type="submit"
          />
        </Stack>
      </form>
    </Dialog>
  );
};

export default NewsPreview;
