import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import useEmployeeResourceForm from "../../../../hooks/resource/employeeResource/EmployeeResourceForm/useEmployeeResourceForm";
import {
  useGetAvailableOfficeResource,
  useGetOfficeResource,
} from "../../../../hooks/resource/officeResource/useOfficeResource";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";

const EmployeeResourceFields = ({ onClose, isLoading, data, editMode }) => {
  const { data: availableOfficeResource, isLoading: resourceLoad } =
    useGetAvailableOfficeResource();
  const { data: officeResourceData } = useGetOfficeResource();
  const { data: employeeData } = useGetEmployee();
  const { mode } = useContext(ThemeModeContext);
  const { formik } = useEmployeeResourceForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
    // onClose();
    }
  };
  
  const submitButtonText = data ? "Update Logistics" : " Provide Logistics";
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="employeeId"
            name="employeeId"
            disabled={editMode}
            options={employeeData || []}
            getOptionLabel={(employee) =>
              `${employee?.firstName} ${employee?.middleName || ''} ${employee?.lastName}`
            }
            value={employeeData?.find(
              (employee) => employee?.id === formik.values?.employeeId
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue("employeeId", newValue?.id || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee Name"
                placeholder="Select employee"
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="officeResourceId"
            name="officeResourceId"
            disabled={editMode}
            options={availableOfficeResource || []}
            getOptionLabel={(option) => option?.name || ""}
            value={officeResourceData?.find(
              (resource) =>
                resource?.id === formik.values.officeResourceId || ""
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue("officeResourceId", newValue?.id || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Office Logistics"
                placeholder="Select logistics"
                fullWidth
                required
                error={
                  formik.touched.officeResourceId &&
                  Boolean(formik.errors.officeResourceId)
                }
                helperText={
                  formik.touched.officeResourceId &&
                  formik.errors.officeResourceId
                }
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            type="date"
            id="receiveDate"
            name="receiveDate"
            label="Received Date"
            placeholder="Select date"
            fullWidth
            required
            value={formik.values.receiveDate}
            onChange={formik.handleChange}
            inputProps={{
              max: currentDate, // Disable past date selections
            }}
            error={
              formik.touched.receiveDate && Boolean(formik.errors.receiveDate)
            }
            helperText={formik.touched.receiveDate && formik.errors.receiveDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            type="date"
            id="returnDate"
            name="returnDate"
            label="Returned Date"
            placeholder="Select date"
            fullWidth
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            error={
              formik.touched.returnDate && Boolean(formik.errors.returnDate)
            }
            helperText={formik.touched.returnDate && formik.errors.returnDate}
            variant="outlined"
            inputProps={{
              max: currentDate,
            }}
            InputLabelProps={{ shrink: true }}
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
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
          >
            {submitButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EmployeeResourceFields;
