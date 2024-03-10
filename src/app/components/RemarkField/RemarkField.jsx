import React, { useEffect, useState } from 'react';
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
  req,
}) => {
  const [remainingChars, setRemainingChars] = useState(maxLength);

  useEffect(() => {
    if (data) {
      const remaining = maxLength - data.length;
      setRemainingChars(remaining >= 0 ? remaining : 0);
    }
  }, [data, maxLength]);

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
      required={req ? true : false}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={
        <>
          {formik.touched[name] && Boolean(formik.errors[name]) ? (
            <>
              {formik.errors[name]}
              <br />
            </>
          ) : null}
          {`${remainingChars} characters remaining`}
        </>
      }
      variant={variant || 'outlined'}
      multiline={multiline || false}
      rows={rows || 3}
    />
  );
};

export default RemarkField;
