import React, { useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import { useSendEmailToAll } from "../../hooks/email/useEmail";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useParams } from "react-router-dom";
import { useGetEventById } from "../../hooks/event/useEvent";

const EmailToAll = ({ open, onClose }) => {
  const { id } = useParams();
  const { data: employeeData } = useGetEmployee();
  const eventId = useGetEventById(id);
  console.log(eventId)
  const [employeeId, setEmployeeId] = useState([]);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      sendEmailMutation.mutate(emailData);
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
    if (value === "all") {
      const allEmployeeId = employeeData.map((employee) => employee.id);
      setEmployeeId(allEmployeeId);
    } else {
      setEmployeeId(value);
    }
  };

  return (
    <>
      <FormModal
        open={open}
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
