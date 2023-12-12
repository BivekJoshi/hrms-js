import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetDeactivatedOfficeResource } from "../../../../hooks/resource/officeResource/useOfficeResource";
import { useAddActiveEmployeeForm } from "../../../../hooks/resource/officeResource/activateOfficeResource/useActivateOfficeResourceForm";

const EditOfficeResourceActivationFields = ({ onClose, isLoading, id }) => {
  const newId = id;
  const { data: officeResourceData } = useGetDeactivatedOfficeResource();
  const { formik } = useAddActiveEmployeeForm(id);
  const resourceName =
    officeResourceData &&
    officeResourceData?.find((resource) => resource?.id === newId);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        officeResourceId: true,
      });
      onClose();
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={2}>
        <Typography style={{ padding: "1rem" }} variant="p">
          Are You Sure You Want activate this resource with name ={" "}
          <Typography
            variant="p"
            style={{ color: "#01579b", fontWeight: "600", fontSize: "1.2rem" }}
          >
            {resourceName?.name}
          </Typography>{" "}
          and number ={" "}
          <Typography
            variant="p"
            style={{ color: "#01579b", fontWeight: "600", fontSize: "1.2rem" }}
          >
            {resourceName?.uniqueNumber}
          </Typography>{" "}
        </Typography>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Yes Proceed
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            No
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditOfficeResourceActivationFields;
