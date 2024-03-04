import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { assignWorkShiftForm } from "../../../hooks/workShift/useWorkShiftForm";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";

export const AssignShiftModal = ({ open, handleCloseModal, data }) => {
  const onClose = handleCloseModal;
  const { data: employeeData } = useGetEmployee();
  const { formik } = assignWorkShiftForm(onClose, data);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div>
      <FormModal
        title={"Assign Work Schedule"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="workScheduleId"
                name="workScheduleId"
                label="Schedule Name"
                type="text"
                fullWidth
                disabled
                required
                value={data.scheduleName}
                onChange={formik.handleChange}
                error={
                  formik.touched.workScheduleId &&
                  Boolean(formik.errors.workScheduleId)
                }
                helperText={
                  formik.touched.workScheduleId && formik.errors.workScheduleId
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                id="employeeId"
                name="employeeId"
                options={employeeData || []}
                getOptionLabel={(option) => option?.label}
                value={
                  (employeeData &&
                    employeeData.find(
                      (employee) =>
                        employee.employeeId === formik.values.employeeId
                    )) ||
                  null
                }
                onChange={(event, newValue) => {
                  formik.setFieldValue(
                    "employeeId",
                    newValue?.employeeId || ""
                  );
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Employee Name"
                    // InputLabelProps={{ shrink: true }}
                    required
                    error={
                      formik.touched.employeeId &&
                      Boolean(formik.errors.employeeId)
                    }
                    helperText={
                      formik.touched.employeeId && formik.errors.employeeId
                    }
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="scheduleStartDate"
                name="scheduleStartDate"
                label="Schedule Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                value={formik.values.scheduleStartDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.scheduleStartDate &&
                  Boolean(formik.errors.scheduleStartDate)
                }
                helperText={
                  formik.touched.scheduleStartDate &&
                  formik.errors.scheduleStartDate
                }
                size="small"
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              gap={1}
            >
              <Button
                variant="contained"
                onClick={handleFormSubmit}
                sx={{ mt: 3, ml: 1, color: "#fff" }}
              >
                Assign Work Schedule
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                color="error"
                sx={{ mt: 3, ml: 1, color: "#fff" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        }
      />
      <style>
        {`
        .css-o4b71y-MuiAccordionSummary-content.Mui-expanded {
          margin:0 !important;
        }
        .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded{
            min-height:20px;
        }
        .css-118m9qq-MuiButtonBase-root-MuiCheckbox-root{
            padding:5px 9px;
        }
        `}
      </style>
    </div>
  );
};
