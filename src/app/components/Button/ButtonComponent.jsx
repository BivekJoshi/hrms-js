import { Button } from '@mui/material';
import React from 'react';
import '../Style/Style.css';

export const ButtonComponent = ({
  buttonName,
  OnClick,
  BGColor,
  TextColor,
  NameClass,
  color,
  Border,
  disabled,
}) => {
  return (
    <Button
      className={NameClass ? NameClass : 'buttonHover'}
      variant='contained'
      mt={2}
      style={{ color: color ? color : "", margin: "2rem 1rem" }}
      onClick={OnClick ? OnClick : ''}
      sx={{
        background: BGColor ? BGColor : '',
        color: TextColor ? TextColor : '#fff',
        border: Border ? Border : '',
      }}
      disabled={disabled ? disabled : false}
    >
      {buttonName}
    </Button>
  );
};
