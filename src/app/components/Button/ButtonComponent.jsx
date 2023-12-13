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
       style={{ TextColor: TextColor }}
      onClick={OnClick ? OnClick : ''}
      sx={{
        background: BGColor ? BGColor : '',
        color: color ? color : '#fff',
        border: Border ? Border : '',
      }}
      disabled={disabled ? disabled : false}
    >
      {buttonName}
    </Button>
  );
};
