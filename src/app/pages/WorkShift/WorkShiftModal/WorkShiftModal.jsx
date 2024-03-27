import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import {
  Autocomplete,
  Button,
  TextField,
  AccordionSummary,
  Tooltip,
  Box,
  Tab,
} from "@mui/material";
import { Accordion, AccordionDetails, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { addWorkShiftForm } from "../../../hooks/workShift/useWorkShiftForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "../../../../assets/DeleteIcon.png";
import { FieldArray, FormikProvider } from "formik";
import { TabContext, TabList } from "@mui/lab";

export const WorkShiftModal = ({ open, handleCloseModal }) => {
  const onClose = handleCloseModal;
  const { formik } = addWorkShiftForm(onClose);
  const [value, setValue] = React.useState('1');

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return (
    <div>
      <FormModal
        width={"820px"}
        height="fit-content"
        title={"Add Work Schedule"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid
            container
            spacing={3}
            sx={{
              maxHeight: "80vh",
              overFlowY: "auto",
            }}
          >
            <Grid item xs={12} sm={12}>
              <TextField
                id="scheduleName"
                name="scheduleName"
                label="Schedule Name"
                type="text"
                fullWidth
                required
                value={formik.values.scheduleName}
                onChange={formik.handleChange}
                error={
                  formik.touched.scheduleName &&
                  Boolean(formik.errors.scheduleName)
                }
                helperText={
                  formik.touched.scheduleName && formik.errors.scheduleName
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                id="startWeekDay"
                name="startWeekDay"
                options={daysOfWeek}
                getOptionLabel={(option) => option}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Start Week Day"
                    // InputLabelProps={{ shrink: true }}
                    required
                    error={
                      formik.touched.startWeekDay &&
                      Boolean(formik.errors.startWeekDay)
                    }
                    helperText={
                      formik.touched.startWeekDay && formik.errors.startWeekDay
                    }
                    size="small"
                  />
                )}
                value={formik.values.startWeekDay}
                onChange={(event, newValue) => {
                  formik.setFieldValue("startWeekDay", newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TabContext value={value}>
                <Box>
                  <TabList onChange={handleChange} indicatorColor="none">
                    <Tab label='Normal Office Days' value='1'/>
                    <Tab label='Advance Office Days' value='2'/>
                  </TabList>
                </Box>
              </TabContext>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={{ margin: "0px !important" }}
                >
                  Office Days
                </AccordionSummary>
                <AccordionDetails>
                  <FormikProvider value={formik} {...formik}>
                    <FieldArray
                      name="onOffList"
                      render={(arrayHelpers) => (
                        <>
                          {formik?.values?.onOffList?.map(
                            (onOffLists, index) => (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography ml={1} width="8rem">
                                  Shift Day {index + 1}
                                </Typography>{" "}
                                <>
                                  <Grid display="flex" gap={1} mt={2}>
                                    <TextField
                                      id={`onOffList[${index}].startTime`}
                                      name={`onOffList[${index}].startTime`}
                                      type="time"
                                      label="Start time "
                                      InputLabelProps={{ shrink: true }}
                                      value={onOffLists.startTime}
                                      required
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.onOffList?.[index]
                                          ?.startTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.startTime
                                      }
                                      helperText={
                                        formik.touched.onOffList?.[index]
                                          ?.startTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.startTime
                                      }
                                      size="small"
                                    />
                                    <TextField
                                      id={`onOffList[${index}].endTime`}
                                      name={`onOffList[${index}].endTime`}
                                      type="time"
                                      label="End time"
                                      InputLabelProps={{ shrink: true }}
                                      value={onOffLists.endTime}
                                      required
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.onOffList?.[index]
                                          ?.endTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.endTime
                                      }
                                      helperText={
                                        formik.touched.onOffList?.[index]
                                          ?.endTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.endTime
                                      }
                                      size="small"
                                    />
                                    <TextField
                                      id={`onOffList[${index}].startLateTime`}
                                      name={`onOffList[${index}].startLateTime`}
                                      type="time"
                                      label="Start Late Time"
                                      InputLabelProps={{ shrink: true }}
                                      value={onOffLists.startLateTime}
                                      required
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.onOffList?.[index]
                                          ?.startLateTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.startLateTime
                                      }
                                      helperText={
                                        formik.touched.onOffList?.[index]
                                          ?.startLateTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.startLateTime
                                      }
                                      size="small"
                                    />
                                    <TextField
                                      id={`onOffList[${index}].endEarlyTime`}
                                      name={`onOffList[${index}].endEarlyTime`}
                                      type="time"
                                      label="End EarlyTime"
                                      InputLabelProps={{ shrink: true }}
                                      value={onOffLists.endEarlyTime}
                                      required
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.onOffList?.[index]
                                          ?.endEarlyTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.endEarlyTime
                                      }
                                      helperText={
                                        formik.touched.onOffList?.[index]
                                          ?.endEarlyTime &&
                                        formik.errors.onOffList?.[index]
                                          ?.endEarlyTime
                                      }
                                      size="small"
                                    />
                                  </Grid>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: ".5rem",
                                      justifyContent: "flex-end",
                                      marginTop: "20px",
                                    }}
                                  >
                                    {index ===
                                      formik.values.onOffList.length - 1 && (
                                        <Button
                                          onClick={() =>
                                            arrayHelpers.push({
                                              startTime: "",
                                              endTime: "",
                                              startLateTime: "",
                                              endEarlyTime: "",
                                            })
                                          }
                                          disabled={
                                            index !==
                                            formik.values.onOffList.length - 1
                                          }
                                        >
                                          <Tooltip title="Add work schedule">
                                            <AddIcon />
                                          </Tooltip>
                                        </Button>
                                      )}
                                    {formik.values.onOffList.length > 1 && (
                                      <Button
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          marginLeft:
                                            index ===
                                              formik.values.onOffList.length - 1
                                              ? "0"
                                              : "10px",
                                        }}
                                      >
                                        <Tooltip title="Delete work schedule">
                                          <img src={DeleteIcon} alt="icon" />
                                        </Tooltip>
                                      </Button>
                                    )}
                                  </div>
                                </>
                              </div>
                            )
                          )}
                        </>
                      )}
                    />
                  </FormikProvider>
                </AccordionDetails>
              </Accordion>
              {formik.errors.onOffList && formik.touched.onOffList && (
                <Typography
                  color="#d32f2f"
                  ml="14px"
                  fontSize=".75rem"
                  mt="4px"
                >
                  {" "}
                  Required
                </Typography>
              )}
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
                Add Work Schedule
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
        .css-1pduc5x-MuiStack-root>.MuiTextField-root {
          min-width: 140px;
        }.css-1nda1ky-MuiButtonBase-root-MuiButton-root{
          min-width: 0;
          padding:0
        }
        `}
      </style>
    </div>
  );
};
