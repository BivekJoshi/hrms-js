import { Grid, TextField, Button, MenuItem } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import useEditDocumentForm from "./useEditDocumentForm";

const EditDocumentFields = ({ onClose, isLoading, data }) => {
  const { formik } = useEditDocumentForm(data);
  
  const handleChangeImage = (e) => {
    setSelectedDocument(e.target.files[0]);
  };
  
  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        document: true,
      });
      onClose();
    } else {
      toast.error("please fill all the required fields");
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <input
            type="file"
            label="citizenship"
            onChange={handleChangeImage}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Update Document
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditDocumentFields;
