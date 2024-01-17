import React, { useState } from 'react';
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
import useAddRenamePasswordForm from '../../../hooks/auth/resetPassword/useAddRenamePasswordForm';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InitialPage from '../InitialPage/InitialPage';
import { toast } from 'react-toastify';

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
            <Grid display='flex' gap={1} alignItems='center'>
              <CheckCircleOutlineIcon sx={{ color: 'green' }} />
              {props.message}
            </Grid>
          ) : (
            <Grid display='flex' gap={1} alignItems='center'>
              <CancelOutlinedIcon sx={{ color: 'red' }} />
              {props.message}
            </Grid>
          )}
        </Typography>
      </div>
    </>
  );
}

const RenamePassword = ({ isLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const newId = location?.search;
  const id = newId?.substring(6);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCancel = () => {
    navigate('/');
  };

  const {
    formik,
    showValues,
    handleClickShowPassword,
    loading,
    handleMouseDownPassword,
  } = useAddRenamePasswordForm({ id });
  const {
    lowerValidated,
    upperValidated,
    numberValidated,
    specialValidated,
    lengthValidated,
    handleChangeValidation,
  } = usePasswordValidation();

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const style = {
    display: 'grid',
    marginRight: '4rem',
    marginLeft: '4rem',
    gap: '.5rem',
  };

  return (
    !isLoading && (
      <>
        {/* <InitialPage /> */}
        <Grid
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: { lg: '1fr 1fr', xs: '1fr' },
            marginTop: '5rem',
            gap: { xs: '1rem', lg: 0 },
            border: '.5px solid grey',
            padding: 5,
          }}
        >
          <Stack>
            <div style={{ display: 'grid', justifyContent: 'center' }}>
              <Typography variant='h4' component='h2'>
                Create Password <LockPersonIcon sx={{ fontSize: '2rem' }} />
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
            <Grid item>
              <TextField
                id='password'
                name='password'
                label='Password'
                placeholder='Enter your new password'
                fullWidth
                required
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChangeValidation(e.target.value);
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant='outlined'
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
                placeholder='Confirm your new password'
                fullWidth
                required
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                variant='outlined'
                type={showConfirmPassword ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Tooltip
                        title={`Show ${
                          showConfirmPassword ? 'Hidden' : 'Visible'
                        } Confirm Password`}
                      >
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showConfirmPassword ? (
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
                onClick={handleFormSubmit}
                variant='contained'
                sx={{ textTransform: 'capitalize' }}
                fullWidth
              >
                Create Password
              </LoadingButton>
              <Button
                onClick={handleCancel}
                sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
              >
                <ArrowBackIcon />
                Back to your login page
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </>
    )
  );
};

export default RenamePassword;
