import React from "react";
import { Box, Modal } from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { useContext } from "react";

const FormModal = ({ open, onClose, formComponent, sx }) => {
  const { mode } = useContext(ThemeModeContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    background: mode === "light" ? "" : "#413e3e",
    color: mode === "light" ? "" :'white'
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={sx}
    >
      <Box sx={style}>{formComponent}</Box>
    </Modal>
  );
};

export default FormModal;
