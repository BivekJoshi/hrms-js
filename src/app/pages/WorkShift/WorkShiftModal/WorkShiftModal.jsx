import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { addWorkShiftForm } from "../../../hooks/workShift/useWorkShiftForm";

export const WorkShiftModal = ({ open, handleCloseModal }) => {
  const onClose = handleCloseModal;
  const { formik } = addWorkShiftForm(onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  console.log(formik);

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
        title={"Add Work Schedule"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid container spacing={3}>
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
                    InputLabelProps={{ shrink: true }}
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
                  <FormGroup>
                    {[
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={formik?.values.onOffList[index]}
                            onChange={(e) => {
                              const updatedOnOffList = [
                                ...formik.values.onOffList,
                              ];
                              updatedOnOffList[index] = e.target.checked;
                              formik.setFieldValue(
                                "onOffList",
                                updatedOnOffList
                              );
                              formik.setFieldTouched("onOffList", true); // Mark field as touched
                              formik.setFieldError(
                                "onOffList",
                                updatedOnOffList.some((value) => value === true)
                                  ? ""
                                  : "Required"
                              ); // S
                            }}
                          />
                        }
                        label={day}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              {formik.touched.onOffList && formik.errors.onOffList && (
                <Typography style={{ fontSize: "1px" }} color={"red"}>
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
                Add Work Shift
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
