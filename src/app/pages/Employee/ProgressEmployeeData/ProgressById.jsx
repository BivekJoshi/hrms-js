import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEmployeeProgress } from '../../../hooks/employee/useEmployee';
import { LinearProgress, Typography } from '@mui/material';
import useAuth from '../../../../auth/hooks/component/login/useAuth';
import { useGetLoggedInUser } from '../../../hooks/auth/usePassword';

const ProgressById = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();

  const { id } = useParams();

  const { data: loggedInUserData } = isEmployee ? useGetLoggedInUser() : {};

  const { data, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetEmployeeProgress(id)
      : useGetEmployeeProgress(loggedInUserData?.employeeId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No progress data found</p>;
  }

  const {
    bankSet,
    companySet,
    departmentSet,
    familySet,
    addressSet,
    positionSet,
    employmentHistoryAdded,
    qualificationAdded,
  } = data;

  const calculateProgress = () => {
    const filledItems = [
      bankSet,
      companySet,
      departmentSet,
      familySet,
      addressSet,
      positionSet,
      employmentHistoryAdded,
      qualificationAdded,
    ].filter((item) => item).length;

    const progress = (filledItems / 8) * 100;

    return progress;
  };

  const progress = calculateProgress();

  return (
    <>
      <Typography variant='h5'>Profile Completed</Typography>
      <LinearProgress variant='determinate' value={progress} />
      <Typography textAlign={'end'} marginBottom={'1rem'}>
        {progress}% Complete
      </Typography>
    </>
  );
};

export default ProgressById;
