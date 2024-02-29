import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const WorkShiftModal = ({ open, handleCloseModal }) => {
  //   const status = [
  //     {
  //       value: 0,
  //       label: "Sunday",
  //     },
  //     {
  //       value: 1,
  //       label: "Monday",
  //     },{
  //       value: 3,
  //       label: "Tuesday",
  //     },
  //     {
  //       value: 4,
  //       label: "Wednesday",
  //     },

  //     {
  //       value: 5,
  //       label: "Tuesday",
  //     },
  //     {
  //       value: 5,
  //       label: "Tuesday",
  //     },
  //     {
  //       value: 6,
  //       label: "Tuesday",
  //     },
  //   ];
  return (
    <div>
      <FormModal
        title={"Add Work Shift"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="shiftName"
                name="shiftName"
                label="Shift Name"
                type="text"
                // InputLabelProps={{ shrink: true }}
                fullWidth
                // inputProps={{ min: currentDate }}
                required
                // value={formik.values.dueDate}
                // onChange={formik.handleChange}
                // error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                // helperText={formik.touched.dueDate && formik.errors.dueDate}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="startWeekDay"
                name="startWeekDay"
                label="Start Week Day"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                // inputProps={{ min: currentDate }}
                required
                // value={formik.values.dueDate}
                // onChange={formik.handleChange}
                // error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                // helperText={formik.touched.dueDate && formik.errors.dueDate}
                size="small"
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
                    <FormControlLabel control={<Checkbox />} label="Sunday" />
                    <FormControlLabel control={<Checkbox />} label="Monday" />
                    <FormControlLabel control={<Checkbox />} label="Tuesday" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Wednesday"
                    />
                    <FormControlLabel control={<Checkbox />} label="Thursday" />
                    <FormControlLabel control={<Checkbox />} label="Friday" />
                    <FormControlLabel control={<Checkbox />} label="Saturday" />
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
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
                // onClick={handleFormSubmit}
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
