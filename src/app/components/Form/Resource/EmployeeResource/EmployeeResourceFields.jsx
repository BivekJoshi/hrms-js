import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useContext } from 'react';
import useEmployeeResourceForm from '../../../../hooks/resource/employeeResource/EmployeeResourceForm/useEmployeeResourceForm';
import {
  useGetAvailableOfficeResource,
  useGetOfficeResource,
} from '../../../../hooks/resource/officeResource/useOfficeResource';
import {
  useGetEmployee,
  useGetEmployeeName,
} from '../../../../hooks/employee/useEmployee';
import ThemeModeContext from '../../../../../theme/ThemeModeContext';
import RemarkField from '../../../RemarkField/RemarkField';

const EmployeeResourceFields = ({ onClose, isLoading, data, editMode }) => {
  const { data: availableOfficeResource, isLoading: resourceLoad } =
    useGetAvailableOfficeResource();
  const { data: officeResourceData } = useGetOfficeResource();
  const { data: employeeData } = useGetEmployeeName();

  const { formik } = useEmployeeResourceForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {data ? (
            <TextField
              variant='outlined'
              label='Employee Name'
              fullWidth
              required
              disabled
              value={
                [
                  data?.employee?.firstName,
                  data?.employee?.middleName,
                  data?.employee?.lastName,
                ]
                  .filter(Boolean)
                  .join(' ') || ''
              }
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
          ) : (
            <Autocomplete
              id='employeeId'
              name='employeeId'
              disabled={editMode}
              options={employeeData || []}
              getOptionLabel={(employee) => `${employee?.label}`}
              value={employeeData?.find((emp) => {
                emp?.employeeId === formik.values.employeeId || '';
              })}
              onChange={(event, newValue) => {
                formik.setFieldValue('employeeId', newValue?.employeeId || '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Employee Name"
                  fullWidth
                  required
                  variant='outlined'
                  error={
                    formik.touched.employeeId &&
                    Boolean(formik.errors.employeeId)
                  }
                  helperText={
                    formik.touched.employeeId && formik.errors.employeeId
                  }
                  size='small'
                />
              )}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={12}>
          {data ? (
            <TextField
              variant='outlined'
              label='Office Logistics'
              fullWidth
              required
              disabled
              value={data?.officeResource?.name || ''}
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
          ) : (
            <Autocomplete
              id='officeResourceId'
              name='officeResourceId'
              disabled={editMode}
              options={availableOfficeResource || []}
              getOptionLabel={(option) => option?.name || ''}
              value={officeResourceData?.find(
                (resource) =>
                  resource?.id === formik.values.officeResourceId || ''
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('officeResourceId', newValue?.id || '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Office Logistics"
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
                  InputLabelProps={{ shrink: Boolean(formik.values.officeResourceId) }}
                  size="small"
                />
              )}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            type="date"
            id="receiveDate"
            name="receiveDate"
            label="Received Date"
            fullWidth
            required
            value={formik.values.receiveDate}
            onChange={formik.handleChange}
            inputProps={{
              max: currentDate,
            }}
            error={
              formik.touched.receiveDate && Boolean(formik.errors.receiveDate)
            }
            helperText={formik.touched.receiveDate && formik.errors.receiveDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="conditionWhileProvided"
            name="conditionWhileProvided"
            label="Device Condition"
            fullWidth
            value={formik.values.conditionWhileProvided}
            onChange={formik.handleChange}
            error={
              formik.touched.conditionWhileProvided &&
              Boolean(formik.errors.conditionWhileProvided)
            }
            helperText={
              formik.touched.conditionWhileProvided &&
              formik.errors.conditionWhileProvided
            }
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.conditionWhileProvided) }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <RemarkField
            id="remarks"
            name="remarks"
            label="Remarks"
            fullWidth
            formik={formik}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.remarks),
            }}
            rows={3}
            inputProps={{ maxLength: 255 }}
          />
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <Button
            variant='contained'
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Submit
          </Button>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color='error'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EmployeeResourceFields;
