import { Button } from "@mui/material";
import React from "react";

const HocButton = ({
  buttonName,
  onClick,
  sx,
  bg,
  variant,
  permissions,
  icon,
  disabledIcon,
  color,
}) => {
  const isDiabled = !permissions;
  const disabledBg = "";
  const disabledColor = "";

  return (
    <Button
      sx={{
        ...sx,
        backgroundColor:isDiabled ? disabledBg : bg,
        color: isDiabled ? disabledColor : color,
        cursor: isDiabled ? "not-allowed" : "pointer",
      }}
      variant={variant}
      onClick={isDiabled ? null : onClick}
    >
      {isDiabled ? (disabledIcon || icon || buttonName) : icon || buttonName}
    </Button>
  );
};

export default HocButton;