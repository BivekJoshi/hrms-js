import { Grid, TextField, Button, Autocomplete } from "@mui/material";
import React from "react";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
const FilterForm = ({
  employeeId,
  fromDate,
  toDate,
  handleEmployeeChange,
  handleDateFromChange,
  handleDateToChange,
  handleButtonClick,
}) => {
  const { data: employeeData } = useGetEmployee();
  return (
    <Grid container spacing={3} sx={{ margin: "12px 0 12px 0" }}>
      <Grid item xs={3} sm={3}>
        <Autocomplete
          id="employeeId"
          name="employeeId"
          options={employeeData || []}
          value={
            employeeData.find((employee) => employee.id === employeeId) || null
          }
          onChange={(event, newValue) => handleEmployeeChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Employee Name"
              fullWidth
              required
              variant="outlined"
              size="small"
            />
          )}
        />
      </Grid>
      <Grid item xs={3} sm={3}>
        {/* <TextField
          id="fromDate"
          name="fromDate"
          fullWidth
          required
          value={fromDate}
          onChange={handleDateFromChange}
          variant="outlined"
          size="small"
        /> */}
        <NepaliDatePicker
          value={fromDate}
          format="YYYY-MM-DD"
          onChange={handleDateFromChange}
          id="fromDate"
          name="fromDate"
          // options={{ calenderLocale: "ne", valueLocale: "en" }} />
        />
      </Grid>
      <Grid item xs={3} sm={3}>
        <NepaliDatePicker
          id="toDate"
          name="toDate"
          fullWidth
          required
          value={toDate}
          onChange={handleDateToChange}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={3} sm={3}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterForm;
