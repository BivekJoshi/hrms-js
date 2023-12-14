import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import './Style/Login.css';
import bg1 from '../../../../assets/login-bg.png';
import groupImg from '../../../../assets/group.png';

import poweredBy from '../../../../assets/poweredBy.jpg';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import { useLoginForm } from '../../../../auth/hooks/component/login/useLoginForm';
const NewLogin = () => {
  const { mode } = useContext(ThemeModeContext);
  const {
    formik,
    showValues,
    handleClickShowPassword,
    loading,
    handleMouseDownPassword,
  } = useLoginForm({});
  return (
    <div style={{ height: '100vh' }}>
      <div className='login-bgg' style={{ backgroundImage: `url(${bg1})` }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Box className='input-section'>
            <Typography fontSize='40px' color='primary' fontWeight='600'>
              Log In
            </Typography>
            <Typography variant='p' color='#6C49B4'>
              your account to continue
            </Typography>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <TextField
                required
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                id='email'
                label='Email Address'
                name='email'
                type='email'
                variant='outlined'
                autoFocus
                autoComplete='username'
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant='outlined'
                required
                label='Password'
                name='password'
                autoComplete='current-password'
                fullWidth
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
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
                type={showValues.showPassword ? 'text' : 'password'}
                sx={{ minWidth: '10vw', mt: 1 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Tooltip title='Show Password'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
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
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
              >
                <Link
                  className='forgot-password'
                  to='forgot-password'
                  style={{ color: mode === 'light' ? '' : 'white' }}
                >
                  Forget password?
                </Link>
              </Grid>

              <LoadingButton
                fullWidth
                onClick={() => formik.submitForm()}
                variant='contained'
                loading={loading}
                className='login-btn'
              >
                Sign In
              </LoadingButton>
            </div>
          </Box>
          <div className='side-box'>
            <img
              src={groupImg}
              alt='img'
              width='336px'
              height='375px'
              style={{ position: 'relative', zIndex: 2 }}
            />
            <span className='login-lines'>
              <svg
                width='400'
                height='278'
                viewBox='0 0 400 278'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g opacity='0.1'>
                  <path
                    d='M2 14.1788C6.40977 11.2027 17.3663 12.0172 25.9145 39.0837C36.5997 72.9168 34.5644 99.3249 58.479 118.121C83.9199 138.117 93.223 131.758 139.636 131.758C181.868 131.758 201.14 141.842 230.206 177.236C253.102 205.117 265.314 271.686 303.984 275.446C311.956 276.855 330.087 271.78 338.839 240.203C347.59 208.625 366.569 210.442 374.965 215.298'
                    stroke='#6DAB23'
                    stroke-width='3'
                  />
                  <path
                    d='M0 1.90858C3.05292 0.185599 10.7361 -1.38075 17.0455 6.13772C24.9322 15.5358 25.441 14.1261 34.3453 31.0427C41.6723 43.4482 54.5285 72.5509 60.0407 85.5516C64.4505 96.0461 80.1391 118.445 107.615 124.084C141.961 131.132 127.205 188.129 204.545 174.833C215.994 175.617 245.963 185.547 274.254 219.004C302.544 252.462 327.595 230.752 336.584 215.715C342.096 206.317 357.497 190.152 375 200.678'
                    stroke='#6DAB23'
                    stroke-width='3'
                  />
                </g>
              </svg>
            </span>
            <div className='login-hrms'>
              <Typography
                variant='h4'
                color='#401686'
                textAlign='center'
                fontFamily='Poppins'
                fontWeight='bold'
              >
                Welcome to HRMS
              </Typography>
              <Typography
                variant='p'
                color='#401686'
                textAlign='center'
                fontFamily='Poppins'
                fontStyle='italic'
              >
                "Leading people, Leading Organizations"
              </Typography>
            </div>
            <div>
              <img src={poweredBy} alt='cp' width='118px' height='15px' />
              <Typography fontSize='11px' color='#7A757F' textAlign='center'>
                Version 1.0
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
