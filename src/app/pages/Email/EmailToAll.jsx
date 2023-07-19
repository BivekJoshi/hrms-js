import React from "react";
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
import { useState } from "react";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useEffect } from "react";

const EmailToAll = ({ open, onClose }) => {
  const { data: employeeData } = useGetEmployee();
  const [employeeId, setEmployeeId] = useState([]);
  const [emailData, setEmailData] = useState({
    to: employeeData.officeEmail || "",
    subject: "",
    message: "",
  });

useEffect(() => {
  // if (employeeId)
  // useGetEmployee();
  console.log(employeeId);
}, [employeeId])


  const [errors, setErrors] = useState({
    to: false,
    message: false,
  });

  const { mutate } = useSendEmailToAll({ employeeId });

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
      mutate(emailData);
      setEmailData({
        to: "",
        subject: "",
        message: "",
      });
      setErrors({
        to: false,
        subject: false,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    if (emailData.to.trim() === "") {
      updatedErrors.to = true;
      isValid = false;
    } else {
      updatedErrors.to = false;
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

  // select email
  const [personName, setPersonName] = useState([]);

  const handleChange = (event, id) => {
    setEmployeeId(id);
    const {
      target: { value },
    } = event;
    setPersonName(value);
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
                  {/* <TextField
                    fullWidth
                    label="To"
                    name="to"
                    value={emailData.to}
                    onChange={handleInputChange}
                    error={errors.to}
                    helperText={errors.to ? "To is required" : ""}
                  /> */}

                  <InputLabel id="demo-multiple-name-label">To</InputLabel>
                  <Select
                    sx={{ m: 1, width: 300 }}
                    labelId="demo-multiple-name-label"
                    id="employeeId"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="To" />}
                    onClick={() => employeeId}

                    // MenuProps={MenuProps}
                  >
                    {employeeData.map((name, employeeId) => (
                      <MenuItem
                        key={name.id}
                        value={name.officeEmail}
                        // style={getStyles(name, personName, theme)}
                        // onClick={employeeId}
                      >
                        {name.officeEmail}
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
                  onClick={onClose}
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
