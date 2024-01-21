import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./Style/Login.css";
import groupImg from "../../../../assets/group.png";

import poweredBy from "../../../../assets/poweredBy.jpg";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useLoginForm } from "../../../../auth/hooks/component/login/useLoginForm";
import Bg from "../../../../assets/bg.png";
import { getUser, removeUser } from "../../../utils/cookieHelper";
import jwtDecode from "jwt-decode";

const NewLogin = () => {
  const { mode } = useContext(ThemeModeContext);
  const {
    formik,
    showValues,
    handleClickShowPassword,
    loading,
    handleMouseDownPassword,
  } = useLoginForm({});

  const authToken = getUser();

  const [user, setUser] = useState(authToken);

  const navigate = useNavigate();
  useEffect(() => {
    setUser(authToken);
    if (user) {
      const decode = jwtDecode(user);
      const userRole = decode?.userRole;

      if (!userRole) {
        removeUser();
        navigate("/");
      } else if (
        userRole === "ROLE_SUPER_ADMIN" ||
        userRole === "ROLE_ADMIN" ||
        userRole === "ROLE_MANAGER" ||
        userRole === "ROLE_HR_ADMIN" ||
        userRole === "ROLE_HR_CLERK"
      ) {
        navigate("/admin/dashboard");
      } else if (userRole === "ROLE_EMPLOYEE") {
        navigate("/employee/home");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div style={{ height: "100dvh" }}>
      <div className="login-bgg">
        <Grid className="login-bg-design">
          <Box display="flex" justifyContent="center" height="100vh">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="112"
              viewBox="0 0 72 112"
              fill="none"
              style={{ top: "0", left: "1px", position: "absolute" }}
            >
              <ellipse
                opacity="0.2"
                cx="14.5691"
                cy="12.8671"
                rx="14.5691"
                ry="12.8671"
                transform="matrix(1 0 0 -1 35.5117 78.6409)"
                fill="#6DAB23"
              />
              <ellipse
                opacity="0.2"
                cx="6.82926"
                cy="5.71871"
                rx="6.82926"
                ry="5.71871"
                transform="matrix(1 0 0 -1 44.6172 44.3286)"
                fill="#6DAB23"
              />
              <ellipse
                opacity="0.2"
                cx="13.1448"
                cy="11.4099"
                rx="13.1448"
                ry="11.4099"
                transform="matrix(1 0 0 -1 8 34.3337)"
                fill="#6C49B4"
              />
              <ellipse
                opacity="0.2"
                cx="9.63951"
                cy="8.36728"
                rx="9.63951"
                ry="8.36728"
                transform="matrix(1 0 0 -1 35 16.7346)"
                fill="#6C49B4"
              />
              <ellipse
                opacity="0.2"
                cx="6.37398"
                cy="5.71871"
                rx="6.37398"
                ry="5.71871"
                transform="matrix(1 0 0 -1 59 19.8113)"
                fill="#6C49B4"
              />
              <ellipse
                opacity="0.2"
                cx="21.3984"
                cy="18.5858"
                rx="21.3984"
                ry="18.5858"
                transform="matrix(1 0 0 -1 0 112)"
                fill="#6DAB23"
              />
            </svg>
            <Grid className="largDesign" width={{ lg: "30rem", xs: "80%" }}>
              <Typography fontSize="40px" color="primary" fontWeight="600">
                Log In
              </Typography>
              <Typography
                variant="p"
                color="#6C49B4"
                sx={{ fontWeight: "500", paddingTop: "0" }}
              >
                your account to continue
              </Typography>
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
                InputLabelProps={{ shrink: Boolean(formik.values.email) }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <MailOutlineRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                required
                label="Password"
                name="password"
                autoComplete="current-password"
                fullWidth
                // autoFocus
                size="small"
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
                InputLabelProps={{ shrink: Boolean(formik.values.password) }}
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
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Link
                  // className="forgot-password"
                  to="forgot-password"
                  style={{ color: "#6DAB23", textDecoration: "none" }}
                >
                  <Typography variant="p">Forget password?</Typography>
                </Link>
              </Grid>

              <LoadingButton
                fullWidth
                onClick={() => formik.submitForm()}
                variant="contained"
                loading={loading}
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Login
              </LoadingButton>
            </Grid>
          </Box>
          <Grid
            position="relative"
            className="topAt920"
            height="100vh"
            style={{
              backgroundImage: `url(${Bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <Box className="side-box" left={{ sm: "30%", xs: "20%" }}>
              <img
                src={groupImg}
                alt="img"
                width="295px"
                height="250px"
                style={{ position: "relative", zIndex: 2 }}
                className="imggroup"
              />
              <span className="login-lines">
                <svg
                  width="100%"
                  height="278"
                  viewBox="0 0 400 278"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.1">
                    <path
                      d="M2 14.1788C6.40977 11.2027 17.3663 12.0172 25.9145 39.0837C36.5997 72.9168 34.5644 99.3249 58.479 118.121C83.9199 138.117 93.223 131.758 139.636 131.758C181.868 131.758 201.14 141.842 230.206 177.236C253.102 205.117 265.314 271.686 303.984 275.446C311.956 276.855 330.087 271.78 338.839 240.203C347.59 208.625 366.569 210.442 374.965 215.298"
                      stroke="#6DAB23"
                      stroke-width="3"
                    />
                    <path
                      d="M0 1.90858C3.05292 0.185599 10.7361 -1.38075 17.0455 6.13772C24.9322 15.5358 25.441 14.1261 34.3453 31.0427C41.6723 43.4482 54.5285 72.5509 60.0407 85.5516C64.4505 96.0461 80.1391 118.445 107.615 124.084C141.961 131.132 127.205 188.129 204.545 174.833C215.994 175.617 245.963 185.547 274.254 219.004C302.544 252.462 327.595 230.752 336.584 215.715C342.096 206.317 357.497 190.152 375 200.678"
                      stroke="#6DAB23"
                      stroke-width="3"
                    />
                  </g>
                </svg>
              </span>
              <div className="login-hrms">
                <Typography
                  variant="h5"
                  color="#401686"
                  textAlign="center"
                  fontFamily="Poppins"
                  fontWeight="bold"
                  className="typo"
                >
                  Welcome to HRMS
                </Typography>
                <Typography
                  fontSize="13px"
                  color="#401686"
                  textAlign="center"
                  fontFamily="Poppins"
                  fontStyle="italic"
                >
                  "Leading people, Leading Organizations"
                </Typography>
              </div>
              <div>
                <img src={poweredBy} alt="cp" width="118px" height="15px" />
                <Typography fontSize="11px" color="#7A757F" textAlign="center">
                  Version 1.0
                </Typography>
              </div>
            </Box>
            <Grid
              className="smallDesign"
              position="absolute"
              top="35%"
              left={{ sm: "30%", xs: "20%" }}
            >
              <Typography fontSize="40px" color="white" fontWeight="600">
                Log In
              </Typography>
              <Typography
                variant="p"
                color="white"
                sx={{ fontWeight: "500", paddingTop: "0" }}
              >
                your account to continue
              </Typography>
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
                variant="filled"
                autoFocus
                autoComplete="username"
                InputLabelProps={{ shrink: Boolean(formik.values.email) }}
                size="small"
              />
              <TextField
                variant="filled"
                required
                label="Password"
                name="password"
                autoComplete="current-password"
                fullWidth
                size="small"
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
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Link
                  // className="forgot-password"
                  to="forgot-password"
                  style={{ color: "#6DAB23", textDecoration: "none" }}
                >
                  <Typography variant="p" color="#402c8a">
                    Forget password?
                  </Typography>
                </Link>
              </Grid>

              <LoadingButton
                fullWidth
                onClick={handleFormSubmit}
                variant="contained"
                loading={loading}
                sx={{
                  textTransform: "none",
                  color: "white",
                  bgcolor: "#402c8a",

                  fontWeight: "bold",
                }}
              >
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NewLogin;
