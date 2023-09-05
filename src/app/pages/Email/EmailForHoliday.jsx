import React, { useState } from "react";
import { useSendEmailForHoliday } from "../../hooks/email/useEmail";
import {
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useGetEmployee } from "../../hooks/employee/useEmployee";

const EmailForHoliday = ({ getEventID, onClose }) => {

  const { data: employeeData } = useGetEmployee();
  const [employeeId, setEmployeeId] = useState([]);
  const [emailData, setEmailData] = useState();

  const sendEmailMutation = useSendEmailForHoliday({
    onSuccess: () => {
      setEmailData();
      onClose();
    },
    employeeId: employeeId,
    holidayId: getEventID,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmailMutation.mutate(emailData);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value === "all") {
      const allEmployeeId = employeeData.map((employee) => employee.id);
      setEmployeeId(allEmployeeId);
    } else {
      setEmployeeId(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Email</h2>
        <Grid container spacing={2}>
          <Grid
            item
            spacing={1}
            xs={12}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Select
              sx={{ m: 1, width: 300 }}
              labelId="demo-multiple-name-label"
              id="employeeId"
              select
              value={employeeId}
              onChange={handleChange}
              input={<OutlinedInput label="To" />}
            >
              <MenuItem value="all">All Employees</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ marginLeft: "10px" }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default EmailForHoliday;