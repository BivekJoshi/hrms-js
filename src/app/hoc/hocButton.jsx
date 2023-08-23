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
  return permissions ? (
    <Button
      sx={{
        ...sx,
        backgroundColor: bg,
        color: color,
      }}
      variant={variant}
      onClick={onClick}
    >
      {icon || buttonName}
    </Button>
  ) : (
    <Button
      disabled
      sx={{
        ...sx,
        backgroundColor: `${bg} "!important"`,
        color: { color },
        opacity: 1.7,
        cursor: "no-drop",
      }}
      variant={variant}
      onClick={onClick}
    >
      {disabledIcon || icon || buttonName}
    </Button>
  );
};

export default HocButton;
