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
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import NormalWorkShiftField from "./NormalWorkShiftField";

export const WorkShiftModal = ({ open, handleCloseModal }) => {
  const onClose = handleCloseModal;
  const { formik } = addWorkShiftForm(onClose);
  const [value, setValue] = React.useState('1');
  const { palette, mode } = React.useContext(ThemeModeContext);

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

  const labelStyle = {
    backgroundColor: palette.secondary.main,
    marginLeft: '.5rem',
    textTransform: 'none',
    borderRadius: '.5rem',
    color: mode === 'light' ? 'black' : 'white',
    textDecoder: 'none',
    marginBottom: "1rem"
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === 'dark' ? palette.text.primary : palette.secondary.light,
    borderBottom: 'none',
    textDecoder: 'none',
    color: mode === 'dark' ? 'black' : 'white',
  };

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
              <TabContext value={value}>
                <Box>
                  <TabList onChange={handleChange} indicatorColor="none">
                    <Tab label='Normal Office Days' value='1' style={value === '1' ? activeLabelStyle : labelStyle} />
                    <Tab label='Advance Office Days' value='2' style={value === '2' ? activeLabelStyle : labelStyle} />
                  </TabList>
                  <TabPanel value="1" sx={{ padding: 0 }}>
                    <Box>
                      <Accordion defaultExpanded>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          style={{ margin: "0px !important" }}
                        >
                          Normal Office Days
                        </AccordionSummary>
                        <AccordionDetails>
                          <NormalWorkShiftField formik={formik}/>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2" sx={{ padding: 0 }}>
                    <Grid item xs={12} sm={12} sx={{marginBottom:"1rem"}}>
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
                    <Accordion defaultExpanded>
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
                            name="shiftTimeReqList"
                            render={(arrayHelpers) => (
                              <>
                                {formik?.values?.shiftTimeReqList?.map(
                                  (shiftTimeReqList, index) => (
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
                                            id={`shiftTimeReqList[${index}].startTime`}
                                            name={`shiftTimeReqList[${index}].startTime`}
                                            type="time"
                                            label="Start time "
                                            InputLabelProps={{ shrink: true }}
                                            value={shiftTimeReqList.startTime}
                                            required
                                            onChange={formik.handleChange}
                                            error={
                                              formik.touched.shiftTimeReqList?.[index]
                                                ?.startTime &&
                                              formik.errors.shiftTimeReqList?.[index]
                                                ?.startTime
                                            }
                                            helperText={
                                              formik.touched.shiftTimeReqList?.[index]
                                                ?.startTime &&
                                              formik.errors.shiftTimeReqList?.[index]
                                                ?.startTime
                                            }
                                            size="small"
                                          />
                                          <TextField
                                            id={`shiftTimeReqList[${index}].endTime`}
                                            name={`shiftTimeReqList[${index}].endTime`}
                                            type="time"
                                            label="End time"
                                            InputLabelProps={{ shrink: true }}
                                            value={shiftTimeReqList.endTime}
                                            required
                                            onChange={formik.handleChange}
                                            error={
                                              formik.touched.shiftTimeReqList?.[index]
                                                ?.endTime &&
                                              formik.errors.shiftTimeReqList?.[index]
                                                ?.endTime
                                            }
                                            helperText={
                                              formik.touched.shiftTimeReqList?.[index]
                                                ?.endTime &&
                                              formik.errors.shiftTimeReqList?.[index]
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
                                            value={shiftTimeReqList.startLateTime}
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
                                            value={shiftTimeReqList.endEarlyTime}
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
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: ".5rem",
                                            justifyContent: "flex-end",
                                            marginTop: "20px",
                                          }}
                                        >
                                          {index ===
                                            formik.values.shiftTimeReqList.length - 1 && (
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
                                                  formik.values.shiftTimeReqList.length - 1
                                                }
                                              >
                                                <Tooltip title="Add work schedule">
                                                  <AddIcon />
                                                </Tooltip>
                                              </Button>
                                            )}
                                          {formik.values.shiftTimeReqList.length > 1 && (
                                            <Button
                                              onClick={() => {
                                                arrayHelpers.remove(index);
                                              }}
                                              style={{
                                                cursor: "pointer",
                                                marginLeft:
                                                  index ===
                                                    formik.values.shiftTimeReqList.length - 1
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
                    {formik.errors.shiftTimeReqList && formik.touched.shiftTimeReqList && (
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
                  </TabPanel>
                </Box>
              </TabContext>
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
