import { Button } from "@mui/material";
import React from "react";
import "../Style/Style.css"

export const ButtonComponent = ({
  buttonName,
  OnClick,
  BGColor,
  TextColor,
  NameClass,
  Border,
  disabled
}) => {
  return (
    <Button
      className={NameClass ? NameClass : "buttonHover"}
      variant="contained"
      // style={{ margi?nTop: "10px" }}
      onClick={OnClick ? OnClick : ""}
      sx={{
        background: BGColor ? BGColor : "",
        color: TextColor ? TextColor : "",
        border: Border ? Border: "",
      }}
      disabled= {disabled ? disabled :""}
    >
      {buttonName}
    </Button>
  );
};
