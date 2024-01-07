import React from "react";

const renderOptions = (props, option, type) => {
  return (
    <li {...props} key={option?.id}>
      {option?.[type]}
    </li>
  );
};

export default renderOptions;
