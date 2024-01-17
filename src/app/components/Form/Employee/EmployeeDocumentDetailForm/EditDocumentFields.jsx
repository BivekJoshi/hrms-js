import {
  Grid,
  TextField,
  Button,
  MenuItem,
  selectClasses,
} from "@mui/material";
import React, { useState } from "react";
import useEditDocumentForm from "./useEditDocumentForm";

const EditDocumentFields = ({ onClose, isLoading, id }) => {
  const [selectedDocument, setSelectedDocument] = useState();
  const { formik } = useEditDocumentForm(id, selectedDocument);

  const handleChangeImage = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        id: id,
        document: selectedDocument || "",
      });
      onClose();
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <input type="file" label="citizenship" onChange={handleChangeImage} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
            // color="error"
          >
            Update Document
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditDocumentFields;
