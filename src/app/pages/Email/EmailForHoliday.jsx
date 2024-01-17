import React, { useState } from "react";
import { useSendEmailForHoliday } from "../../hooks/email/useEmail";
import {
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { getBusinessAEmployeeById, getBusinessBEmployeeById, getFemaleEmployeeById, getMaleEmployeeById, getTechnicalEmployeeById } from "../../components/Email/EmailSorting";

const EmailForHoliday = ({ getEventID, onClose }) => {
  const { data: employeeData } = useGetEmployee();
  const [employeeId, setEmployeeId] = useState();
  const [emailData, setEmailData] = useState();

  const maleEmployeeData = getMaleEmployeeById();
  const femaleEmployeeData = getFemaleEmployeeById();
  const technicalEmployeeData = getTechnicalEmployeeById();
  const businessAEmployeeData = getBusinessAEmployeeById();
  const businessBEmployeeData = getBusinessBEmployeeById();

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
    } else if (value === "male") {
      const allEmployeeId = maleEmployeeData;
      setEmployeeId(allEmployeeId);
    } else if (value === "female") {
      const allEmployeeId = femaleEmployeeData;
      setEmployeeId(allEmployeeId);
    } else if (value === "technical") {
      const allEmployeeId = technicalEmployeeData;
      setEmployeeId(allEmployeeId);
    } else if (value === "businessa") {
      const allEmployeeId = businessAEmployeeData;
      setEmployeeId(allEmployeeId);
    } else if (value === "businessb") {
      const allEmployeeId = businessBEmployeeData;
      setEmployeeId(allEmployeeId);
    } else {
      setEmployeeId(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">Emzzzzail</Typography>
        <Grid container spacing={2}>
          <Grid
            item
            spacing={1}
            xs={12}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              id="holidayId"
              name="holidayId"
              select
              label="Select"
              placeholder="Select employees"
              fullWidth
              required
              value={employeeId}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="all">All Employees</MenuItem>
              <MenuItem value="male">Male Employees</MenuItem>
              <MenuItem value="female">Female Employees</MenuItem>
              <MenuItem value="technical">Technical Employees</MenuItem>
              <MenuItem value="businessa">Business A Employees</MenuItem>
              <MenuItem value="businessb">Business B Employees</MenuItem>
              {/* <MenuItem value="none">None</MenuItem> */}
              </TextField>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button type="submit" variant="contained" color="primary" sx={{color: "#fff"}}>
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