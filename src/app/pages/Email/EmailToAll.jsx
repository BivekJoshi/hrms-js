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

const EmailToAll = ({ open, onClose }) => {
  const { data: employeeData } = useGetEmployee();
  const [employeeId, setEmployeeId] = useState([]);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    subject: false,
    message: false,
  });

  const sendEmailMutation = useSendEmailToAll({
    onSuccess: () => {
      setEmailData({
        subject: "",
        message: "",
      });
      setErrors({
        subject: false,
        message: false,
      });
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      sendEmailMutation.mutate(emailData, employeeId);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    if (emailData.subject.trim() === "") {
      updatedErrors.subject = true;
      isValid = false;
    } else {
      updatedErrors.subject = false;
    }
    if (emailData.message.trim() === "") {
      updatedErrors.message = true;
      isValid = false;
    } else {
      updatedErrors.message = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmployeeId(value);
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
                <Grid item xs={10}>
                  <InputLabel id="demo-multiple-name-label">To</InputLabel>
                  <Select
                    sx={{ m: 1, width: 300 }}
                    labelId="demo-multiple-name-label"
                    id="employeeId"
                    multiple
                    value={employeeId}
                    onChange={handleChange}
                    input={<OutlinedInput label="To" />}
                  >
                    {employeeData.map((employee) => (
                      <MenuItem
                        key={employee.id}
                        value={JSON.stringify(employeeData.employeeId)}
                      >
                        {employee.officeEmail}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={emailData.subject}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={12}
                    cols={100}
                    label="Body"
                    name="message"
                    value={emailData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    helperText={errors.message ? "message is required" : ""}
                  />
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
                  //onClick={onClose}
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
