import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useChangeForm, useResendForm } from '../../../hooks/email/changeEmail/useChangeForm';
import HocButton from '../../../hoc/hocButton';
import { useGetLoggedInUser } from '../../../hooks/auth/usePassword';
import { axiosInstance } from '../../../../auth/axiosInterceptor';
import { useParams } from 'react-router-dom';

const ChangeEmail = ({permissions}) => {
  const { id } = useParams();
  const { formik } = useChangeForm({});
  // const { formik: resendFormik } = useResendForm({});
  const { data: userLoggedData } = useGetLoggedInUser()
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const handleResend = () => {
    axiosInstance.post('user/activate/email-resend')
    // resendFormik.handleSubmit();
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant='h4'>Change Email </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='newEmail'
          name='newEmail'
          label='New Email'
          placeholder='Enter New Email'
          fullWidth
          required
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
          helperText={formik.touched.newEmail && formik.errors.newEmail}
          variant='outlined'
          InputLabelProps={{ shrink: true }}
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='confirmEmail'
          name='confirmEmail'
          label='Confirm Email'
          placeholder='Enter Confirm Email'
          fullWidth
          required
          value={formik.values.confirmEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)
          }
          helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
          variant='outlined'
          InputLabelProps={{ shrink: true }}
          size='small'
        />
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='flex-end'
        marginTop='1rem'
      >
         {userLoggedData?.changeEmailReq && userLoggedData?.id === 1 && (
          <HocButton
          variant='contained'
          permissions={permissions?.canAdd}
          onClick={handleResend}
          buttonName={"Resend Email"}
          />
            
        )}
        <HocButton
          variant="contained"
          permissions={permissions?.canAdd}
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
          buttonName={"Change Email"}
        />
      </Grid>
    </Grid>
  );
};

export default ChangeEmail;
