import {
  Autocomplete,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

const passedLevel = [
  {
    id: 1,
    label: "SLC / SEE",
  },
  {
    id: 2,
    label: "HSEB / NEB",
  },
  {
    id: 3,
    label: "Undergraduate",
  },
  {
    id: 4,
    label: "Post Graduate",
  },
  {
    id: 5,
    label: "Graduate",
  },
];
const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
); // Change 100 to adjust the range of available years

const QualificationAddField = ({ formik }) => {
  const handleImageChange = (fileName, event) => {
    formik.setFieldValue(fileName, event.target.files[0]);
  };

  console.log(formik.values);
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
      {/* <Grid item xs={12}>
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
      </Grid> */}
      <Grid item xs={12}>
        <Autocomplete
          options={years}
          onChange={formik.handleChange}
          value={formik.values.passedLevel}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                id={`passedLevel`}
                name={`passedLevel`}
                label="Passed Year"
                placeholder="Enter passed level"
                fullWidth
                error={
                  formik.touched.passedLevel &&
                  Boolean(formik.errors.passedLevel)
                }
                helperText={
                  formik.touched.passedLevel && formik.errors.passedLevel
                }
                variant="outlined"
                size="small"
              />
            );
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`passedLevel`}
          name={`passedLevel`}
          label="Passed Level"
          placeholder="Enter passed level"
          fullWidth
          select
          // required
          value={formik.values.passedLevel}
          onChange={formik.handleChange}
          error={
            formik.touched.passedLevel && Boolean(formik.errors.passedLevel)
          }
          helperText={formik.touched.passedLevel && formik.errors.passedLevel}
          variant="outlined"
          size="small"
        >
          {passedLevel?.map((option) => (
            <>
              {/* <MenuItem value="" disabled>
                Select Level
              </MenuItem> */}
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            </>
          ))}
        </TextField>
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
      <Grid item xs={12}>
        <FormLabel component="legend">Upload Transcript</FormLabel>
        <Input
          type="file"
          fullWidth
          id="transcript"
          name="transcript"
          onChange={(e) => handleImageChange("transcript", e)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Upload Character Certificate</FormLabel>
        <Input
          type="file"
          fullWidth
          id="characterCertificate"
          name="characterCertificate"
          onChange={(e) => handleImageChange("characterCertificate", e)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Upload other Document</FormLabel>
        <Input
          type="file"
          fullWidth
          id="otherDocument"
          name="otherDocument"
          onChange={(e) => handleImageChange("otherDocument", e)}
        />
      </Grid>
    </Grid>
  );
};

export default QualificationAddField;
