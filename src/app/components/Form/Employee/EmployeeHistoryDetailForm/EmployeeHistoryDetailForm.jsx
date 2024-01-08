import { Button, Divider, Grid, TextField, Tooltip } from '@mui/material';
import { FieldArray, FormikProvider } from 'formik';
import React from 'react';
import { useDeleteHistory } from '../../../../hooks/employee/useEmployeeHistory';
import DeleteIcon from '../../../../../assets/DeleteIcon.png';
import AddIcon from '@mui/icons-material/Add';

const EmployeeHistoryDetailForm = ({ formik, isLoading }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  const deleteHistoryMutation = useDeleteHistory({});
  const handleDeleteHistory = (history) => {
    console.log(history, "history")
    if (history.id) {
      deleteHistoryMutation.mutate(history.id);
    }
  };
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    !isLoading && (
      <div>
        <FormikProvider value={formik}>
          <FieldArray
            name='history'
            render={(arrayHelpers) => (
              <>
                {formik.values.history.map((employeeHistory, index) => (
                  <React.Fragment key={index}>
                    <br />
                    <Divider> Add Work History</Divider>
                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].employerName`}
                          name={`history[${index}].employerName`}
                          label='Organization Name'
                          placeholder='Enter organization Name'
                          fullWidth
                          // required
                          onBlur={handleBlur}
                          value={employeeHistory.employerName}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.employerName &&
                              errors.history?.[index]?.employerName
                          )}
                          helperText={
                            touched.history?.[index]?.employerName &&
                            errors.history?.[index]?.employerName
                          }
                          variant='outlined'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].employerAddress`}
                          name={`history[${index}].employerAddress`}
                          label='Organization Address'
                          placeholder='Enter organization Address'
                          fullWidth
                          // required
                          onBlur={handleBlur}
                          value={employeeHistory.employerAddress}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.employerAddress &&
                              errors.history?.[index]?.employerAddress
                          )}
                          helperText={
                            touched.history?.[index]?.employerAddress &&
                            errors.history?.[index]?.employerAddress
                          }
                          variant='outlined'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].pastPosition`}
                          name={`history[${index}].pastPosition`}
                          label='Past Position'
                          placeholder='Enter Past Position'
                          fullWidth
                          // required
                          onBlur={handleBlur}
                          value={employeeHistory.pastPosition}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.pastPosition &&
                              errors.history?.[index]?.pastPosition
                          )}
                          helperText={
                            touched.history?.[index]?.pastPosition &&
                            errors.history?.[index]?.pastPosition
                          }
                          variant='outlined'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].fromDate`}
                          name={`history[${index}].fromDate`}
                          label='Date From'
                          placeholder='Select Date Form'
                          fullWidth
                          type='date'
                          // required
                          inputProps={{
                            max: currentDate, // Disable past date selections
                          }}
                          onBlur={handleBlur}
                          value={employeeHistory.fromDate}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.fromDate &&
                              errors.history?.[index]?.fromDate
                          )}
                          helperText={
                            touched.history?.[index]?.fromDate &&
                            errors.history?.[index]?.fromDate
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        <TextField
                          id={`history[${index}].description`}
                          name={`history[${index}].description`}
                          label='Description'
                          placeholder='Enter Description'
                          fullWidth
                          multiline
                          onBlur={handleBlur}
                          // required
                          value={employeeHistory.description}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.description &&
                              errors.history?.[index]?.description
                          )}
                          helperText={
                            touched.history?.[index]?.description &&
                            errors.history?.[index]?.description
                          }
                          variant='outlined'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].toDate`}
                          name={`history[${index}].toDate`}
                          label='Date To'
                          placeholder='Enter Date To'
                          fullWidth
                          type='date'
                          onBlur={handleBlur}
                          inputProps={{
                            min: formik?.values?.history[index]?.fromDate,
                            max: currentDate,
                          }}
                          // required
                          value={employeeHistory.toDate}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.toDate &&
                              errors.history?.[index]?.toDate
                          )}
                          helperText={
                            touched.history?.[index]?.toDate &&
                            errors.history?.[index]?.toDate
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          size='small'
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].remarks`}
                          name={`history[${index}].remarks`}
                          label='Remarks'
                          placeholder='Enter Remarks'
                          fullWidth
                          onBlur={handleBlur}
                          // required
                          value={employeeHistory.remarks}
                          onChange={handleChange}
                          error={Boolean(
                            touched.history?.[index]?.remarks &&
                              errors.history?.[index]?.remarks
                          )}
                          helperText={
                            touched.history?.[index]?.remarks &&
                            errors.history?.[index]?.remarks
                          }
                          variant='outlined'
                          size='small'
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={8}>
                        <div
                          style={{
                            display: 'flex',
                            gap: '.5rem',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <div
                            onClick={() =>
                              arrayHelpers.push({
                                employerName: '',
                                employerAddress: '',
                                pastPosition: '',
                                fromDate: '',
                                toDate: '',
                                description: '',
                                remarks: '',
                              })
                            }
                            style={{
                              cursor:
                                index !== values.history.length - 1
                                  ? 'not-allowed'
                                  : 'pointer',
                              color:
                                index !== values.history.length - 1
                                  ? '#BDBDBD'
                                  : '#388E3C',
                              pointerEvents:
                                index !== values.history.length - 1
                                  ? 'none'
                                  : 'auto',
                            }}
                            disabled={index !== values.history.length - 1}
                          >
                            <Tooltip title='Add work history'>
                              <AddIcon />
                            </Tooltip>
                          </div>
                          {values.history.length > 1 && (
                            <div
                              onClick={() => {
                                arrayHelpers.remove(index);
                                handleDeleteHistory(employeeHistory);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Tooltip title='Delete work history'>
                                <img src={DeleteIcon} alt='icon' />
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
                <br />
              </>
            )}
          />
        </FormikProvider>
      </div>
    )
  );
};

export default EmployeeHistoryDetailForm;
