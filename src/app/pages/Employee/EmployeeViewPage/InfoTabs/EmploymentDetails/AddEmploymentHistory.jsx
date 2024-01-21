import React from "react";
import FormModal from "../../../../../components/Modal/FormModal";
import AddEmploymentHistoryFields from "../../../../../components/Form/EmploymentHistory/AddEmploymentHistoryFields";
import { Button, Grid } from "@mui/material";
import useEmploymentHistory from "../../../../../hooks/employee/useEmploymentHistory";

export const AddEmploymentHistory = ({
  open,
  onClose,
  title,
  multiplePosition,
}) => {
  const { formik } = useEmploymentHistory({ onClose });
  const handleFormSubmit = () => {
    formik.handleSubmit();
    onClose();
  };
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={onClose}
        formComponent={
          <>
            <AddEmploymentHistoryFields
              onClose={onClose}
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
                onClick={onClose}
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
