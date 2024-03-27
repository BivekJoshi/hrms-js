import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { addWorkShiftForm } from '../../../hooks/workShift/useWorkShiftForm';
import { FieldArray, FormikProvider } from 'formik';

const NormalWorkShiftField = ({ formik }) => {
    const numberOfShifts = 7;

    // const shiftTimeReqList = Array.from({ length: numberOfShifts }, (_, index) => ({
    //     startTime: formik.values.shiftTimeReqList[index]?.startTime,
    //     endTime: formik.values.shiftTimeReqList[index]?.endTime,
    //     startLateTime: formik.values.shiftTimeReqList[index]?.startLateTime,
    //     endEarlyTime: formik.values.shiftTimeReqList[index]?.endEarlyTime,
    // }));


    // const handleSubmit = () => {
    //     formik.handleSubmit();
    // };

    React.useEffect(() => {
        formik.setFieldValue('startWeekDay', 'SUNDAY');
    }, [formik.setFieldValue]);
    
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <FormikProvider value={formik} {...formik}>
                    {[...Array(numberOfShifts)].map((_, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: '10px'
                            }}
                        >
                            <Typography ml={1} width="8rem">
                                Shift Day {index + 1}
                            </Typography>{" "}
                            <Grid display="flex" gap={1} mt={2}>
                                <TextField
                                    id={`shiftTimeReqList[${index}].startTime`}
                                    name={`shiftTimeReqList[${index}].startTime`}
                                    type="time"
                                    label="Start time"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.shiftTimeReqList[index]?.startTime || ''}
                                    onChange={formik.handleChange}
                                    error={formik.touched.shiftTimeReqList?.[index]?.startTime && Boolean(formik.errors.shiftTimeReqList?.[index]?.startTime)}
                                    helperText={formik.touched.shiftTimeReqList?.[index]?.startTime && formik.errors.shiftTimeReqList?.[index]?.startTime}
                                    size="small"
                                    required
                                />
                                <TextField
                                    id={`shiftTimeReqList[${index}].endTime`}
                                    name={`shiftTimeReqList[${index}].endTime`}
                                    type="time"
                                    label="End time"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.shiftTimeReqList[index]?.endTime || ''}
                                    required
                                    onChange={formik.handleChange}
                                    error={
                                        formik?.touched?.shiftTimeReqList?.[index]
                                            ?.endTime &&
                                        formik?.errors?.shiftTimeReqList?.[index]
                                            ?.endTime
                                    }
                                    helperText={
                                        formik?.touched?.shiftTimeReqList?.[index]
                                            ?.endTime &&
                                        formik?.errors?.shiftTimeReqList?.[index]
                                            ?.endTime
                                    }
                                    size="small"
                                />
                                <TextField
                                    id={`shiftTimeReqList[${index}].startLateTime`}
                                    name={`shiftTimeReqList[${index}].startLateTime`}
                                    type="time"
                                    label="Start Late Time"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.shiftTimeReqList[index]?.startLateTime}
                                    required
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.shiftTimeReqList?.[index]
                                            ?.startLateTime &&
                                        formik.errors.shiftTimeReqList?.[index]
                                            ?.startLateTime
                                    }
                                    helperText={
                                        formik.touched.shiftTimeReqList?.[index]
                                            ?.startLateTime &&
                                        formik.errors.shiftTimeReqList?.[index]
                                            ?.startLateTime
                                    }
                                    size="small"
                                />
                                <TextField
                                    id={`shiftTimeReqList[${index}].endEarlyTime`}
                                    name={`shiftTimeReqList[${index}].endEarlyTime`}
                                    type="time"
                                    label="End EarlyTime"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.shiftTimeReqList[index]?.endEarlyTime}
                                    required
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.shiftTimeReqList?.[index]
                                            ?.endEarlyTime &&
                                        formik.errors.shiftTimeReqList?.[index]
                                            ?.endEarlyTime
                                    }
                                    helperText={
                                        formik.touched.shiftTimeReqList?.[index]
                                            ?.endEarlyTime &&
                                        formik.errors.shiftTimeReqList?.[index]
                                            ?.endEarlyTime
                                    }
                                    size="small"
                                />
                            </Grid>
                        </div>
                    ))}
                </FormikProvider>
            </div>
        </div>
    );
}

export default NormalWorkShiftField;
