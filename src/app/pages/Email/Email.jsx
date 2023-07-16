import React, { useState } from "react";
import { useSendEmail } from "../../hooks/email/useEmail";
import { Button, Grid, TextField } from "@mui/material";

function EmailForm({ employeeId, onClose, officeEmail }) {
  const [emailData, setEmailData] = useState({
    to: officeEmail || "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    to: false,
    message: false,
  });

  const { mutate } = useSendEmail({ employeeId });

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
      console.log("Sending email:", emailData);

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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Email</h2>
      <div style={{ width: "400px" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="To"
              name="to"
              value={emailData.to}
              onChange={handleInputChange}
              error={errors.to}
              helperText={errors.to ? "To is required" : ""}
            />
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
        <div style={{ marginTop: "20px", columnGap: "20px", display: "flex" }}>
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
      </div>
    </form>
  );
}

export default EmailForm;
