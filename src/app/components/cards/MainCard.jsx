import React from 'react';
import './MainCard.css'; // Import the CSS file
import { Paper } from '@mui/material';

const MainCard = ({
  border = false,
  boxShadow,
  children,
  content = true,
  contentSX = {},
  darkTitle,
  elevation,
  secondary,
  shadow,
  title,
  codeHighlight,
  ...others
}) => {
  return (
    <Paper elevation={3} >
      <div
        className={`main-card ${border ? '1rem' : 'no-border'}`}
        {...others}
      >
        {content && <div className="card-content">{children}</div>}
        {!content && children}
      </div>
    </Paper>
  );
};

export default MainCard;
