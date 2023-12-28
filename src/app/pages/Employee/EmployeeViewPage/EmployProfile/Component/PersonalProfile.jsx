import React, { useContext, useState } from 'react';

import { Box, Button, Chip, Grid } from '@mui/material';
import { Typography, Avatar } from '@mui/material';

import Male from '../../../../../../assets/male.png';
import Female from '../../../../../../assets/female.png';
import BasicInfo from './BasicInfo';
import ThemeModeContext from '../../../../../../theme/ThemeModeContext';
import { DOC_URL } from '../../../../../../auth/axiosInterceptor';
import EmailModal from '../../../../Email/EmailModal';
import { useGetEmployeeByDesignation } from '../../../../../hooks/employee/useEmployee';
import { useGetDesignationById } from '../../../../../hooks/designation/useDesignation';
import { useParams } from 'react-router-dom';
import { useGetLoggedInUser } from '../../../../../hooks/auth/usePassword';
import useAuth from '../../../../../../auth/hooks/component/login/useAuth';

const primaryColor = '#1c7ed6';

export const PersonalProfile = ({ data }) => {
  const { isEmployee } = useAuth();
  const { id } = useParams();
  const { data: loggedUserData } = useGetLoggedInUser();
  const { data: positionData } = useGetDesignationById(id);
  const positionName = positionData && positionData?.positionLevel;
  const [openEmailForm, setOpenEmailForm] = useState(false);
  const handleOpenEmailform = () => {
    setOpenEmailForm(true);
  };
  const handleCloseEmailform = () => {
    setOpenEmailForm(false);
  };
  const { mode } = useContext(ThemeModeContext);

  const employeeImg = loggedUserData?.userPhotoPath;
  const employeeFilePath = employeeImg
    ? DOC_URL + employeeImg
    : data?.gender === 'MALE'
    ? Male
    : Female;

  const photo = data?.employeePhotoPath;
  const filePath = photo
    ? DOC_URL + photo
    : data?.gender === 'MALE'
    ? Male
    : Female;

  return (
    <>
      <Grid
        sx={{
          bgcolor: mode === 'light' ? '#cfe8fc' : '#292929',
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          borderRadius: 5,
          alignItems: 'center',
          p: '1rem',
          gap: '1rem',
        }}
      >
        <Box
          className='profileInfo'
          bgcolor={mode === 'light' ? '' : '#3f413f'}
          sx={{ background: mode === 'light' ? '#bfddf5' : '#3f413f' }}
        >
          <Avatar
            sx={{
              width: 190,
              height: 190,
              bgcolor: primaryColor,
              alignSelf: 'center',
            }}
            variant='circle'
            src={isEmployee ? employeeFilePath : filePath}
          />
          <Typography
            sx={{
              color: primaryColor,
              fontSize: '1.3rem',
              fontWeight: '600',
            }}
          >
            {data?.firstName + ' ' + data?.middleName + ' ' + data?.lastName}
          </Typography>
          <Chip
            label={data?.positionName}
            sx={{ bgcolor: primaryColor, color: 'white', width: ' 9rem' }}
          />
          <Typography
            onClick={handleOpenEmailform}
            sx={{
              color: primaryColor,
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {data?.officeEmail}
          </Typography>
          <Typography
            sx={{ color: primaryColor, fontSize: '1rem', fontWeight: '600' }}
          >
            {data?.data?.addresses[0]?.city === null
              ? ''
              : data?.data?.addresses[0]?.city}
          </Typography>
          <Typography
            sx={{ color: primaryColor, fontSize: '1rem', fontWeight: '600' }}
          >
            {data?.mobileNumber}
          </Typography>
        </Box>

        <BasicInfo data={data} mode={mode} positionName={positionName} />
      </Grid>

      {openEmailForm && (
        <EmailModal
          title={'Send Email'}
          officeEmail={data?.officeEmail || ''}
          employeeId={data?.id}
          open={openEmailForm}
          onClose={handleCloseEmailform}
          handleOpenEmailform={handleOpenEmailform}
        />
      )}
    </>
  );
};
