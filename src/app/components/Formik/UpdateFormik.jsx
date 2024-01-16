import React, { useEffect, useState } from "react";

const UpdateFormik = ({ formik }) => {
  const [isFormDirty, setFormDirty] = useState(false);

  useEffect(() => {
    const isDirty =
      Object.keys(formik.values).some(
        (key) => formik.values[key] !== formik.initialValues[key]
      ) || formik.dirty;
    setFormDirty(isDirty);
  }, [formik.values, formik.initialValues, formik.dirty]);

  return isFormDirty;
};

export default UpdateFormik;
