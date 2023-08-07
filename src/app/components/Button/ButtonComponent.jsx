import { Button } from "@mui/material";
import { columnsStateInitializer } from "@mui/x-data-grid/internals";
import React from "react";

export const ButtonComponent = ({
  buttonName,
  OnClick,
  BGColor,
  TextColor,
}) => {
  return (
    <Button
      variant="contained"
      // style={{ margi?nTop: "10px" }}
      onClick={OnClick ? OnClick : ""}
      sx={{
        background: BGColor ? BGColor : "",
        color: TextColor ? TextColor : "",
      }}
    >
      {buttonName}
    </Button>
  );
};
