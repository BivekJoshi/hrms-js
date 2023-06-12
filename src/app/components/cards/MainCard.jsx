import React from 'react';
import './MainCard.css'; // Import the CSS file

const MainCard = ({
  border = true,
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
    <div
      className={`main-card ${border ? '' : 'no-border'}`}
      {...others}
    >
      {content && <div className="card-content">{children}</div>}
      {!content && children}
    </div>
  );
};

export default MainCard;
