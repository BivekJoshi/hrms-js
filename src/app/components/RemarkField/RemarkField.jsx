import React, { useState } from 'react';
import { TextField } from '@mui/material';

const RemarkField = ({
  maxLength,
  formik,
  id,
  name,
  label,
  fullWidth,
  variant,
  multiline,
  rows,
  data,
}) => {
  const [remainingChars, setRemainingChars] = useState(maxLength - (data ? data.length : 0));

  const handleChange = (event) => {
    const newValue = event.target.value;
    const remaining = maxLength - newValue.length;

    if (remaining >= 0) {
      setRemainingChars(remaining);
      formik.handleChange(event);
    }
  };

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      fullWidth={fullWidth}
      value={formik.values[name]}
      onChange={handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={`${remainingChars} characters remaining`}
      variant={variant || 'outlined'}
      multiline={multiline || false}
      rows={rows || 3}
    />
  );
};

export default RemarkField;
