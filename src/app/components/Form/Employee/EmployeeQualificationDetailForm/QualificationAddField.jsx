import { Grid, TextField } from "@mui/material";
import React from "react";

const QualificationAddField = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id={`board`}
          name={`board`}
          label="Board"
          placeholder="Enter board"
          fullWidth
          value={formik.values.board}
          onChange={formik.handleChange}
          error={formik.touched.board && Boolean(formik.errors.board)}
          helperText={formik.touched.board && formik.errors.board}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`institute`}
          name={`institute`}
          label="Institude"
          placeholder="Enter institude"
          fullWidth
          // required
          value={formik.values.institute}
          onChange={formik.handleChange}
          error={formik.touched.institute && Boolean(formik.errors.institute)}
          helperText={formik.touched.institute && formik.errors.institute}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        {/* <TextField
          id={`passedLevel`}
          name={`passedLevel`}
          label="Passed Level"
          placeholder="Enter passed level"
          fullWidth
          // required
          value={formik.values.passedLevel}
          onChange={formik.handleChange}
          error={
            formik.touched.passedLevel && Boolean(formik.errors.passedLevel)
          }
          helperText={formik.touched.passedLevel && formik.errors.passedLevel}
          variant="outlined"
          size="small"
        /> */}
        <Grid item xs={12} sm={4}>
          <TextField
            id={`passedLevel`}
            name={`passedLevel`}
            label="Passed Level"
            placeholder="Enter your passed level"
            fullWidth
            select
            value={formik.values.passedLevel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passedLevel && Boolean(formik.errors.passedLevel)
            }
            helperText={formik.touched.passedLevel && formik.errors.passedLevel}
            variant="outlined"
            size="small"
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
          >
            <option value="" disabled>
              Select Level
            </option>
            {getOptions(index)?.map((option) => (
              <option key={option?.id} value={option?.label}>
                {`${option?.label}`}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`passedYear`}
          name={`passedYear`}
          label="From Date"
          placeholder="Enter from date"
          fullWidth
          value={formik.values.passedYear}
          onChange={formik.handleChange}
          error={formik.touched.passedYear && Boolean(formik.errors.passedYear)}
          helperText={formik.touched.passedYear && formik.errors.passedYear}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`grade`}
          name={`grade`}
          label="Grade"
          placeholder="Enter grade"
          fullWidth
          value={formik.values.grade}
          onChange={formik.handleChange}
          error={formik.touched.grade && Boolean(formik.errors.grade)}
          helperText={formik.touched.grade && formik.errors.grade}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default QualificationAddField;
