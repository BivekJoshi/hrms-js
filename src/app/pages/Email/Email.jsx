import React, { useState } from "react";
import { useSendEmail } from "../../hooks/email/useEmail";
import { Button, Grid, TextField, Box, Typography } from "@mui/material";

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
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Send Email
          </Typography>
        </Grid> */}
        <br />
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="To"
            name="to"
            value={emailData?.to}
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
            value={emailData?.subject}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={10}
            cols={90}
            label="Message "
            name="message"
            value={emailData?.message}
            onChange={handleInputChange}
            error={errors.message}
            helperText={errors.message ? "Message is required" : ""}
          />
        </Grid>
        <br />
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Send
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmailForm;
