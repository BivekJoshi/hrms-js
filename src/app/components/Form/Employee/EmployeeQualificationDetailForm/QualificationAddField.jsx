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
        <TextField
          id={`passedLevel`}
          name={`passedLevel`}
          label="Passed Level"
          placeholder="Enter passed level"
          fullWidth
          select
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
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`grade`}
          name={`grade`}
          label="Grade/Percentage"
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
        <Autocomplete
          options={years}
          onChange={(e, newValue) => {
            formik.setFieldValue(`passedYear`, newValue);
          }}
          value={formik.values.passedYear}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                id={`passedYear`}
                name={`passedYear`}
                label="Passed Year (A.D.)"
                placeholder="Select your passed year"
                fullWidth
                error={Boolean(
                  formik.touched.education?.passedYear &&
                    formik.errors.education?.passedYear
                )}
                helperText={
                  formik.touched.education?.passedYear &&
                  formik.errors.education?.passedYear
                }
                variant="outlined"
                size="small"
              />
            );
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Upload Transcript</FormLabel>
        <Input
          type="file"
          fullWidth
          id="transcript"
          accept="image/*"
          name="transcript"
          onChange={(e) => handleImageChange("transcript", e)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Upload Character Certificate</FormLabel>
        <Input
          type="file"
          accept="image/*"
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
          accept="image/*"
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
