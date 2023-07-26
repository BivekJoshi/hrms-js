import React from "react";
import { toast } from "react-toastify";
import forget from "../../../../assets/forget.avif";
import useAddResetPasswordForm from "../../../hooks/auth/resetPassword/useAddResetPasswordForm";
import { Grid, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ onClose, isLoading }) => {
  const navigate= useNavigate();
  const { formik } = useAddResetPasswordForm();

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      if (formik.values.password === formik.values.confirmPassword) {
        formik.handleSubmit();
      } else {
        toast.error("Password and confirm password does not match!");
      }
    } else {
      toast.error("Please make sure you have filled the form correctly!")
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
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
              id="password"
              name="password"
              label="password"
              type="password"
              placeholder="Enter your password..."
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password && formik.errors.password
              }
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item >
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              placeholder="Confirm Your Password..."
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
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
              Change Password
            </Button>
          </Grid>
        </Stack>
      </Grid>
    )
  );
};

export default ResetPassword;