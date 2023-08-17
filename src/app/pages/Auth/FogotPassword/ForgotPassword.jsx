import React from "react";
import { toast } from "react-toastify";
import forget from "../../../../assets/forget.avif";
import useAddForgotPasswordForm from "../../../hooks/auth/forgotPassword/useAddForgotPasswordForm";
import { Grid, Button, TextField, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ForgotPassword = ({ onClose, isLoading }) => {
  const navigate = useNavigate();
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
  };

  const style = {
    display: "flex",
    width: "40%",
  };

  return (
    !isLoading && (
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "40%", height: "auto" }}>
          <img src={forget} alt="image" />
        </Stack>
        <Stack style={style}>
          <center>
          <Typography variant="h4" gutterBottom>
            Forgot Your Password?
          </Typography>
          <Typography
            variant="p"
            gutterBottom
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            Enter a Email to get a Reset Link
          </Typography>
          </center>
          <br />
          <Grid item>
            <TextField
              id="email"
              name="email"
              label=" Your Email"
              type="email"
              placeholder="me@dghub.io"
              fullWidth
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid container direction="row" justifyContent="space-between">
            <Button onClick={handleCancel} sx={{ mt: 3, ml: 1 }}>
              <ArrowBackIcon />
              Back to your login page
            </Button>
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Reset Password
            </Button>
          </Grid>
        </Stack>
      </Grid>
    )
  );
};

export default ForgotPassword;
