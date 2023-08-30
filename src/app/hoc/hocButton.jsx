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
  const isDiabled = !permissions === false;

  return (
    <Button
      sx={{
        ...sx,
        backgroundColor:isDiabled ? `${bg} "!important"` : bg,
        color: isDiabled ? color : color,
        opacity : isDiabled ? 0.7 : 1,
        cursor: isDiabled ? "not-allowed !important" : "pointer",
      }}
      variant={variant}
      onClick={isDiabled ? null : onClick}
    >
      {isDiabled ? (disabledIcon || icon || buttonName) : icon || buttonName}
    </Button>
  );
};

export default HocButton;
