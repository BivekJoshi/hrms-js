import React from 'react';
import './MainCard.css';
import { Paper } from '@mui/material';
import { Grow } from '@mui/material';

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
  grow = false,
  ...others
}) => {
  return (
    <Grow in={grow}>
      <Paper elevation={3} sx={{ cursor: "pointer",borderRadius:"10px"}}>
        <div
          className={`main-card ${border ? '1rem' : 'no-border'}`}
          {...others}
        >
          {content && <div className="card-content">{children}</div>}
          {!content && children}
        </div>
      </Paper>
    </Grow>
  );
};

export default MainCard;
