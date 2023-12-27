import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import HocButton from "../../../hoc/hocButton";
import { useGetPathConfig } from "../../../hooks/email/pathConfig/usePathConfig";
import usePathConfigForm from "../../../hooks/email/pathConfig/usePathCofigForm";

const PathConfiguration = ({ permissions }) => {
  const { data } = useGetPathConfig();
  const { formik } = usePathConfigForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h4">Path Configuration </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          name="applicationUrl"
          label="App URL"
          placeholder="Enter New URL"
          fullWidth
          required
          value={formik.values.applicationUrl}
          onChange={formik.handleChange}
          error={
            formik.touched.applicationUrl &&
            Boolean(formik.errors.applicationUrl)
          }
          helperText={
            formik.touched.applicationUrl && formik.errors.applicationUrl
          }
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          name="documentUrl"
          label="Document URL"
          placeholder="Enter Document URL"
          fullWidth
          required
          value={formik.values.documentUrl}
          onChange={formik.handleChange}
          error={
            formik.touched.documentUrl && Boolean(formik.errors.documentUrl)
          }
          helperText={formik.touched.documentUrl && formik.errors.documentUrl}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        marginTop="1rem"
      >
        <HocButton
          variant="contained"
          permissions={permissions?.canAdd}
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
          buttonName={"Submit"}
        />
      </Grid>
    </Grid>
  );
};

export default PathConfiguration;
