import React from "react";
import { toast } from "react-toastify";
import forget from "../../../../assets/forget.avif";
import useAddForgotPasswordForm from "../../../hooks/auth/forgotPassword/useAddForgotPasswordForm";
import { Grid, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onClose, isLoading }) => {
  const navigate= useNavigate();
  const { formik } = useAddForgotPasswordForm();

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
      if (formik.isValid) {
      } else {
        toast.error("Please make sure you have filled the form correctly");
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  }

  const style = {
    display: "flex",
    width: "40%",
    justifyContent: "Column",
    padding: "1rem",
    border: "9px solid rgb(69 24 247)",
    boxShadow: "rgba(0, 0, 0, 0.5) 12px 12px 7px",
    background: "#3edbeb",
    gap: "1rem",
  };

  return (
    !isLoading && (
      <Grid container sx={{display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Stack sx={{width: "40%", height: "auto"}}>
        <img src={forget} alt="image" />
        </Stack>
        <Stack style={style}>
          <Grid item >
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your Email..."
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              helperText={
                formik.touched.email && formik.errors.email
              }
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              onClick={handleCancel}
              sx={{ mt: 3, ml: 1 }}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Send Email
            </Button>
          </Grid>
        </Stack>
      </Grid>
    )
  );
};

export default ForgotPassword;
