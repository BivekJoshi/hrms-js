import React, { useState } from "react";
import { useSendEmailForHoliday } from "../../hooks/email/useEmail";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

const TypeOptions = [
  {
    value: "A",
    label: "All Employees",
    id: 1,
  },
  {
    value: "M",
    label: "Male Employees",
    id: 2,
  },
  {
    value: "F",
    label: "Female Employees",
    id: 3,
  },
  {
    value: "O",
    label: "Other Employees",
    id: 4,
  },
];

const EmailForHoliday = ({ getEventID, onClose }) => {
  const [emailData, setEmailData] = useState();
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState("");

  const sendEmailMutation = useSendEmailForHoliday({
    onSuccess: () => {
      setEmailData();
      onClose();
    },
    holidayId: getEventID,
    type: selectedValue,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!selectedValue) {
      setError('Please select employees');
      return;
    }
    setError('');
    sendEmailMutation.mutate(emailData);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setError('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid
            item
            spacing={1}
            xs={12}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              id="type"
              name="type"
              select
              label="Select Employee"
              fullWidth
              // required
              value={selectedValue}
              onChange={handleChange}
              variant="outlined"
              size="small"
              error={Boolean(error)}
              helperText={error}
            >
              {TypeOptions?.map((option) => (
                <MenuItem key={option?.id} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ my: 1 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ color: "#fff" }}
          >
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
