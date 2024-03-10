import React from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";

const FormModal = ({
  open,
  onClose,
  formComponent,
  sx,
  width,
  title,
  height,
}) => {
  const { mode, palette } = useContext(ThemeModeContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width ? width : 400,
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: "0 0 12px",
    background: mode === "light" ? "" : "#413e3e",
    color: mode === "light" ? "" : "white",
    height: height ? height : { xs: "100%", md: "auto" },
    overflow: { xs: "scroll", md: "auto" },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            position: "sticky",
            zIndex: "100",
            top: "0",
            padding: "12px 24px",
            background:
              mode === "lignt"
                ? palette.background.header
                : palette.background.header,
            color: "#fff",
          }}
        >
          <Typography variant="h6">{title ?? title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid px={3}>{formComponent}</Grid>
        
      </Box>
    </Modal>
  );
};

export default FormModal;
