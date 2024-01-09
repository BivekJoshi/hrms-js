import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import useEmployeeResourceForm from "../../../../hooks/resource/employeeResource/EmployeeResourceForm/useEmployeeResourceForm";

const EditEmployeeResourceFields = ({ onClose, isLoading, data, editMode }) => {
  const { formik } = useEmployeeResourceForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6">
            Employee :{" "}
            <b>
              {data?.employee?.firstName} {data?.employee?.middleName}{" "}
              {data?.employee?.lastName}
            </b>
          </Typography>
          <Typography variant="h6">
            {" "}
            Provided Date : <b>{data?.receiveDate}</b>
          </Typography>
          <Typography variant="h6">
            {" "}
            Logistics : <b>{data?.officeResource?.name}</b>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            type="date"
            id="returnDate"
            name="returnDate"
            label="Returned Date"
            placeholder="Select date"
            fullWidth
            required
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            error={
              formik.touched.returnDate && Boolean(formik.errors.returnDate)
            }
            helperText={formik.touched.returnDate && formik.errors.returnDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            size="small"
            inputProps={{
              min: data?.receiveDate,
            }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <TextField
            id="conditionWhileProvided"
            name="conditionWhileProvided"
            label="Device Condition"
            placeholder="Enter device condition"
            fullWidth
            value={formik.values.conditionWhileProvided}
            onChange={formik.handleChange}
            error={
              formik.touched.conditionWhileProvided &&
              Boolean(formik.errors.conditionWhileProvided)
            }
            helperText={
              formik.touched.conditionWhileProvided &&
              formik.errors.conditionWhileProvided
            }
            variant="outlined"
            size="small"
          />
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <TextField
            id="conditionWhileReturned"
            name="conditionWhileReturned"
            label="Device Condition when Returned"
            placeholder="Enter device condition"
            fullWidth
            value={formik.values.conditionWhileReturned}
            onChange={formik.handleChange}
            error={
              formik.touched.conditionWhileReturned &&
              Boolean(formik.errors.conditionWhileReturned)
            }
            helperText={
              formik.touched.conditionWhileReturned &&
              formik.errors.conditionWhileReturned
            }
            variant="outlined"
            size="small"
          />
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <TextField
            id="remarks"
            name="remarks"
            label="Remark"
            placeholder="Enter remark for the resource"
            fullWidth
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            size="small"
          />
        </Grid> */}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditEmployeeResourceFields;
