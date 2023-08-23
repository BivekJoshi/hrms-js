import { Button } from "@mui/material";
import React from "react";

const HocButton = ({ sx, bg, variant, permissions, onClick, icon, disabledIcon, buttonName, color }) => {

  return permissions ? (
    <Button
      sx= {{
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
      sx= {{
        ...sx,
        backgroundColor: `${bg} "!important"`,
        color: {color},
        opacity: 1.7,
        cursor: "no-drop",
      }}
      className={classes.disabledButton}
      variant={variant}
      onClick={onClick}
     >{disabledIcon || icon || buttonName}</Button>
  );
};

export default HocButton;