import { Button } from "@mui/material";
import React from "react";

const CustomButton = (props) => {
  const {
    variant,
    text,
    onClick,
    type,
    style,
    startIcon,
    endIcon,
    disabled,
    className,
  } = props;

  return (
    <>
      <Button
        color={type}
        className={className ? className : ""}
        variant={variant ? variant : "contained"}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        sx={{ ...style, textTransform: "capitalize" }}
      >
        {text}
      </Button>
    </>
  );
};

export default CustomButton;
