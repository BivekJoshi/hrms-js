import React from "react";
import FormModal from "../../../../../components/Modal/FormModal";
import AddEmploymentHistoryFields from "../../../../../components/Form/EmploymentHistory/AddEmploymentHistoryFields";
import { Button, Grid } from "@mui/material";
import useEmploymentHistory from "../../../../../hooks/employee/useEmploymentHistory";

export const AddEmploymentHistory = ({
  open,
  handleCloseModal,
  title,
  multiplePosition,
}) => {
  const { formik } = useEmploymentHistory(handleCloseModal);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <>
            <AddEmploymentHistoryFields
              onClose={handleCloseModal}
              multiplePosition={multiplePosition}
              formik={formik}
            />
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
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Cancel
              </Button>
            </Grid>
          </>
        }
      />
    </div>
  );
};
