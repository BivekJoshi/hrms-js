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
  const isDisabled = !permissions;
  const disabledBg = "";
  const disabledColor = "";

  const { isEmployee } = useAuth();
  const isIcon = typeof buttonName === "string" && buttonName.trim() === "";
  return isEmployee ? (
    ""
  ) : (
    <Button
      sx={{
        ...sx,
        backgroundColor: isDisabled ? disabledBg : bg,
        color: isDisabled ? disabledColor : color,
        cursor: isDisabled ? "not-allowed" : "pointer",
        minWidth: isIcon ? "0px" : "auto",
        padding: isIcon ? "0px" : "auto",
        '&:hover':{
          backgroundColor: isDisabled ? "" : hoverBg,
        }
      }}
      
      variant={variant}
      onClick={isDisabled ? null : onClick}
    >
      {isDisabled ? disabledIcon || icon || buttonName : icon || buttonName}
    </Button>
  );
};

export default HocButton;
