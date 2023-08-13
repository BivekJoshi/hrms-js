import React, { useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import { useSendEmailToAll } from "../../hooks/email/useEmail";
import { Box, Button, Grid, InputLabel } from "@mui/material";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { useGetEmployee } from "../../hooks/employee/useEmployee";

const EmailToAll = ({ open, onClose, eventId }) => {
  const { data: employeeData } = useGetEmployee();
  const [employeeId, setEmployeeId] = useState();
  const [emailData, setEmailData] = useState({ subject: "", message: "" });
  const [errors, setErrors] = useState({ subject: false, message: false });

  const sendEmailMutation = useSendEmailToAll({
    onSuccess: () => {
      setEmailData({ subject: "", message: "" });
      setErrors({ subject: false, message: false });
    },
    employeeId: employeeId,
    eventId: eventId,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      sendEmailMutation.mutate(emailData);
      onClose();
    }
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };
    setErrors(updatedErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (value === "employee") {
      const allEmployeeId = employeeData.map((employee) => employee.id);
      setEmployeeId(allEmployeeId);
    } else if (value === "admin") {
      setEmployeeId(value);
    } else if (value === "hr") {
      setEmployeeId(value);
    } else if (value === "superadmin") {
      setEmployeeId(value);
    }
  };

  return (
    <>
      <FormModal
        onClose={onClose}
        formComponent={
          <form onSubmit={handleSubmit}>
            <h2>Email</h2>
            <Box style={{ width: "400px" }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  spacing={1}
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <InputLabel id="demo-multiple-name-label">To: </InputLabel>
                  <Select
                    sx={{ m: 1, width: 300 }}
                    labelId="demo-multiple-name-label"
                    id="email-multiple"
                    select
                    value={employeeId}
                    onChange={handleChange}
                    input={<OutlinedInput label="To" />}
                  >
                    <MenuItem value="employee">All Employees</MenuItem>
                    <MenuItem value="admin">All Admin</MenuItem>
                    <MenuItem value="hr">All HR</MenuItem>
                    <MenuItem value="superadmin">Super Admin</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <div
                style={{
                  marginTop: "20px",
                  columnGap: "20px",
                  display: "flex",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Send
                </Button>
              </div>
            </Box>
          </form>
        }
      />
    </>
  );
};

export default EmailToAll;
