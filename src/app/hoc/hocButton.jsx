import { Button } from "@mui/material";
import React from "react";
import useAuth from "../../auth/hooks/component/login/useAuth";

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
  hoverBg,
}) => {
  const { isEmployee } = useAuth();
  const isDisabled = !permissions;

  if (isEmployee && isDisabled) {
    return null;
  }

  const buttonSx = {
    ...sx,
    backgroundColor: isDisabled ? "" : bg,
    color: isDisabled ? "#fff" : color,
    cursor: isDisabled ? "not-allowed" : "pointer",
    "&:hover": {
      backgroundColor: isDisabled ? "" : hoverBg,
    },
  };
  const handleClick = isDisabled ? null : onClick;
  const buttonText = isDisabled
    ? disabledIcon || icon || buttonName
    : icon || buttonName;

  return (
    <Button
      sx={buttonSx}
      variant={variant}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonText}
    </Button>
  );
};

export default HocButton;
