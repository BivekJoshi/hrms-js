import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAddResetPasswordForm from '../../../hooks/auth/resetPassword/useAddResetPasswordForm';
import {
  Grid,
  Button,
  TextField,
  Stack,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
  Divider,
} from '@mui/material';
import usePasswordValidation from './usePasswordValidation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

function ValidationItem(props) {
  return (
    <>
      <div className={props.validated ? 'validated' : 'not-validated'}>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ fontWeight: '90rem', color: '#888888' }}
        >
          {props.validated ? (
            <>
              <CheckCircleOutlineIcon sx={{ color: 'green' }} />
              {props.message}
            </>
          ) : (
            <>
              <CancelOutlinedIcon sx={{ color: 'red' }} />
              {props.message}
            </>
          )}
        </Typography>
      </div>
    </>
  );
}

const ResetPassword = ({ isLoading }) => {
  const {
    formik,
    showValues,
    handleClickShowPassword,
    loading,
    handleMouseDownPassword,
  } = useAddResetPasswordForm();

  const {
    lowerValidated,
    upperValidated,
    numberValidated,
    specialValidated,
    lengthValidated,
    handleChangeValidation,
  } = usePasswordValidation();

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      if (formik.values.password === formik.values.confirmPassword) {
        formik.handleSubmit();
      } else {
        toast.error('Password and confirm password does not match!');
      }
    } else {
      toast.error('Please make sure you have filled the form correctly!');
    }
  };

  const style = {
    display: 'flex',
    // width: '40%',
    justifyContent: 'center',
    padding: { lg: '40px', xs: 0 },
    // border: "9px solid rgb(69 24 247)",
    // boxShadow: "rgba(0, 0, 0, 0.5) 12px 12px 7px",
    // background: "#3edbeb",
    gap: '1rem',
  };

  return (
    !isLoading && (
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: { lg: 'repeat(2, 1fr)', xs: '1fr' },
          marginTop: '30px',
          gap: { xs: '2rem', lg: 0 },
          // justifyContent: "space-around",
          // alignItems: "center",
          // gridTemplateColumns: Repeat(2, 1fr),
        }}
      >
        <Stack>
          <div style={{ display: 'grid', justifyContent: 'center' }}>
            <Typography variant='h4' component='h2'>
              Change Password <LockPersonIcon sx={{ fontSize: '2rem' }} />
            </Typography>
            <br />
            <p>Password must contain :</p>
            <ValidationItem
              validated={lowerValidated}
              message=' At least one lowercase letter'
            />
            <ValidationItem
              validated={upperValidated}
              message=' At least one uppercase letter'
            />
            <ValidationItem
              validated={numberValidated}
              message=' At least one number'
            />
            <ValidationItem
              validated={specialValidated}
              message=' At least one special character'
            />
            <ValidationItem
              validated={lengthValidated}
              message=' At least 8 characters'
            />
          </div>
        </Stack>
        <Divider
          sx={{
            display: { lg: 'none', xs: 'block' },
            backgroundColor: 'GrayText',
          }}
        />
        <Stack style={style}>
          {/* <Grid container spacing={3} > */}
          <Grid item>
            <TextField
              id='oldPassword'
              name='oldPassword'
              label='Old Password'
              placeholder='Enter your old password...'
              fullWidth
              required
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
                handleChangeValidation(e.target.value);
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant='outlined'
              autoFocus
              type={showValues.showPassword ? 'text' : 'password'}
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
          </Grid>
          <Grid item>
            <TextField
              id='password'
              name='password'
              label='New Password'
              placeholder='Enter your new password...'
              fullWidth
              required
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
                handleChangeValidation(e.target.value);
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant='outlined'
              autoFocus
              type={showValues.showPassword ? 'text' : 'password'}
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
          </Grid>
          <Grid item>
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm New Password'
              placeholder='Confirm your new password...'
              fullWidth
              required
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              variant='outlined'
              autoFocus
              type={showValues.showPassword ? 'text' : 'password'}
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
          </Grid>
          <Grid item>
            <LoadingButton
              fullWidth
              onClick={handleFormSubmit}
              variant='contained'
              loading={loading}
              className='login-btn'
            >
              Change Password
            </LoadingButton>
          </Grid>
          {/* </Grid> */}
        </Stack>
      </Grid>
      // <Grid
      //   container
      //   spacing={3}
      //   sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      // >
      //   <Grid item xs={6}>
      //     <Typography variant='h4' component='h2'>
      //       Change Password <LockPersonIcon sx={{ fontSize: '2rem' }} />
      //     </Typography>
      //     <br />
      //     <div style={{ display: 'grid', justifyContent: 'center' }}>
      //       <p>Password must contain :</p>
      //       <ValidationItem
      //         validated={lowerValidated}
      //         message=' At least one lowercase letter'
      //       />
      //       <ValidationItem
      //         validated={upperValidated}
      //         message=' At least one uppercase letter'
      //       />
      //       <ValidationItem
      //         validated={numberValidated}
      //         message=' At least one number'
      //       />
      //       <ValidationItem
      //         validated={specialValidated}
      //         message=' At least one special character'
      //       />
      //       <ValidationItem
      //         validated={lengthValidated}
      //         message=' At least 8 characters'
      //       />
      //     </div>
      //   </Grid>
      //   <Grid item xs={6}>
      //     <Grid container spacing={3}>
      //       <Grid item xs={10}>
      //         <TextField
      //           id='password'
      //           name='password'
      //           label='New Password'
      //           placeholder='Enter your new password...'
      //           fullWidth
      //           required
      //           value={formik.values.password}
      //           onChange={(e) => {
      //             formik.handleChange(e);
      //             handleChangeValidation(e.target.value);
      //           }}
      //           error={
      //             formik.touched.password && Boolean(formik.errors.password)
      //           }
      //           helperText={formik.touched.password && formik.errors.password}
      //           variant='outlined'
      //           autoFocus
      //           type={showValues.showPassword ? 'text' : 'password'}
      //           InputLabelProps={{ shrink: true }}
      //           InputProps={{
      //             endAdornment: (
      //               <InputAdornment position='end'>
      //                 <Tooltip title='Show Password'>
      //                   <IconButton
      //                     aria-label='toggle password visibility'
      //                     onClick={handleClickShowPassword}
      //                     onMouseDown={handleMouseDownPassword}
      //                     edge='end'
      //                   >
      //                     {showValues.showPassword ? (
      //                       <VisibilityOff />
      //                     ) : (
      //                       <Visibility />
      //                     )}
      //                   </IconButton>
      //                 </Tooltip>
      //               </InputAdornment>
      //             ),
      //           }}
      //         />
      //       </Grid>
      //       <Grid item xs={10}>
      //         <TextField
      //           id='confirmPassword'
      //           name='confirmPassword'
      //           label='Confirm New Password'
      //           placeholder='Confirm your new password...'
      //           fullWidth
      //           required
      //           value={formik.values.confirmPassword}
      //           onChange={formik.handleChange}
      //           error={
      //             formik.touched.confirmPassword &&
      //             Boolean(formik.errors.confirmPassword)
      //           }
      //           helperText={
      //             formik.touched.confirmPassword &&
      //             formik.errors.confirmPassword
      //           }
      //           variant='outlined'
      //           autoFocus
      //           type={showValues.showPassword ? 'text' : 'password'}
      //           InputLabelProps={{ shrink: true }}
      //           InputProps={{
      //             endAdornment: (
      //               <InputAdornment position='end'>
      //                 <Tooltip title='Show Password'>
      //                   <IconButton
      //                     aria-label='toggle password visibility'
      //                     onClick={handleClickShowPassword}
      //                     onMouseDown={handleMouseDownPassword}
      //                     edge='end'
      //                   >
      //                     {showValues.showPassword ? (
      //                       <VisibilityOff />
      //                     ) : (
      //                       <Visibility />
      //                     )}
      //                   </IconButton>
      //                 </Tooltip>
      //               </InputAdornment>
      //             ),
      //           }}
      //         />
      //       </Grid>
      //       <Grid item xs={10}>
      //         <LoadingButton
      //           fullWidth
      //           onClick={handleFormSubmit}
      //           variant='contained'
      //           loading={loading}
      //           className='login-btn'
      //         >
      //           Change Password
      //         </LoadingButton>
      //       </Grid>
      //     </Grid>
      //   </Grid>
      // </Grid>
    )
  );
};

export default ResetPassword;
