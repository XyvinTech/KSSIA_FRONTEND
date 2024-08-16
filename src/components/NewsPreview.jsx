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
import img from "../assets/images/view.png";
import { useNavigate } from "react-router-dom";

const NewsPreview = ({ open, onClose, onChange }) => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async () => {
    onChange();
    onClose();
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };
  const handleEdit = (event) => {
    event.preventDefault();
    navigate(`/news/edit`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <DialogContent sx={{ height: "auto", width: "500px", padding: 0 }}>
          <Stack spacing={2} padding={2} justifyContent={"center"}>
            <img src={img} width={"461px"} height={"262px"} />
            <Typography variant="h5" color={"#2C2829"}>
              Kerala's Manufacturing Sector Surges in 2024
            </Typography>
            <Typography variant="h6" color={"#4A4647"}>
              Kerala's Manufacturing Sector Sees 15% Growth in Q2 2024, Driven
              by Innovations in Green Technology
            </Typography>
            <Typography variant="h6" color={"#4A4647"}>
              Lorem ipsum dolor sit amet consectetur. Elit in neque iaculis
              malesuada malesuada eleifend arcu quam adipiscing. Condimentum
              semper mi nibh quam. Semper viverra donec vulputate hendrerit.
              Lectus vitae duis ipsum ut cursus dolor.
            </Typography>
          </Stack>{" "}
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Edit"
            onClick={(event) => handleEdit(event)}
          />
          <StyledButton variant="primary" name="Publish" type="submit" />
        </Stack>
      </form>
    </Dialog>
  );
};

export default NewsPreview;
