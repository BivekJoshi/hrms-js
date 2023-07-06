/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../../../auth/hooks/component/login/useLoginForm";
import "./Login.css";
import bg1 from "../../../assets/background.svg";

const Login = () => {
  const {
    formik,
    showValues,
    handleClickShowPassword,
    loading,
    handleMouseDownPassword,
  } = useLoginForm({});
  // Cookies.remove('hrms');
  return (
    <>
      <div className="container">
        <img className="wave" src="" />
        <div
          className="login-left"
          style={{ backgroundImage: `url(${bg1})` }}
        ></div>
        <div className="login-right">
          <Box component="form" noValidate className="input-section">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className="avatar"
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
              />
            </div>
            <p className="welcome-text">WELCOME</p>
            <Grid>
              <TextField
                required
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                id="email"
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                autoFocus
                autoComplete="username"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant="outlined"
                required
                label="Password"
                name="password"
                autoComplete="current-password"
                fullWidth
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    formik.handleSubmit();
                    ev.preventDefault();
                  }
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type={showValues.showPassword ? "text" : "password"}
                sx={{ minWidth: "10vw", mt: 1 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Show Password">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showValues.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="forgot-password d-flex justify-content-end">
                <Link to="/reset-password">Forgot password?</Link>
              </div>
              <LoadingButton
                fullWidth
                onClick={() => formik.submitForm()}
                variant="contained"
                loading={loading}
                className="login-btn"
              >
                Sign In
              </LoadingButton>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
