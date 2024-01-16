import React from "react";
import { Grid, TextField } from "@mui/material";
import PermissionHoc from "../../../hoc/permissionHoc";
import FormModal from "../../Modal/FormModal";
import { ButtonComponent } from "../../Button/ButtonComponent";

const HolidayFields = ({
  formik,
  openAddModal,
  setOpenAddModal,
  handleCloseModal,
  handleFormSubmit,
}) => {
  return (
    <>
      {openAddModal && (
        <FormModal
          title={"Add Holiday"}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          formComponent={
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="holidayName"
                  name="holidayName"
                  label="Holiday"
                  fullWidth
                  required
                  multiline
                  value={formik.values.holidayName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.holidayName &&
                    Boolean(formik.errors.holidayName)
                  }
                  helperText={
                    formik.touched.holidayName && formik.errors.holidayName
                  }
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: Boolean(formik.values.holidayName),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="holidayDate"
                  name="holidayDate"
                  type="date"
                  label="Date of Holiday"
                  fullWidth
                  required
                  value={formik.values.holidayDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.holidayDate &&
                    Boolean(formik.errors.holidayDate)
                  }
                  helperText={
                    formik.touched.holidayDate && formik.errors.holidayDate
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="holidayDescription"
                  name="holidayDescription"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formik.values.holidayDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.holidayDescription &&
                    Boolean(formik.errors.holidayDescription)
                  }
                  helperText={
                    formik.touched.holidayDescription &&
                    formik.errors.holidayDescription
                  }
                  variant="outlined"
                  InputLabelProps={{
                    shrink: Boolean(formik.values.holidayDescription),
                  }}
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                gap={1}
                mt={2}
              >
                <ButtonComponent
                  variant="contained"
                  OnClick={handleFormSubmit}
                  color={"#fff"}
                  sx={{ mt: 3, ml: 1, color: "#fff" }}
                  buttonName={"Add Holiday"}
                />
                <ButtonComponent
                  variant="contained"
                  OnClick={handleCloseModal}
                  sx={{ mt: 3, ml: 1 }}
                  BGColor={"#d32f2f"}
                  color={"#fff"}
                  buttonName={"Cancel"}
                />
              </Grid>
            </Grid>
          }
        />
      )}
    </>
  );
};

export default PermissionHoc(HolidayFields);
