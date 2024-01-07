import React, { useState } from 'react';
import {
  useGetEmployeeById,
  useGetLoggedInUserInfo,
} from '../../../../hooks/employee/useEmployee';
import { useParams } from 'react-router-dom';

import './Style/Style.css';
import { DetailProfile } from './Component/DetailProfile';
import { PersonalProfile } from './Component/PersonalProfile';
import ProgressById from '../../ProgressEmployeeData/ProgressById';
import useAuth from '../../../../../auth/hooks/component/login/useAuth';
import { EmployeeDetailProfile } from './Component/EmployeeDetailProfile';
import { useGetLoggedInUser } from '../../../../hooks/auth/usePassword';
import { Typography } from '@mui/material';
import { ButtonComponent } from '../../../../components/Button/ButtonComponent';

const EmployeeProfile = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();
  const { id } = useParams();
  const { data: userData } = useGetLoggedInUser();
  const empId = userData && userData?.employeeId;
  const isAdmins = isSuperAdmin || isAdmin || isHrAdmin || isHr || isManager;
  const { data: employeeDataById, isLoading } = isAdmins
    ? useGetEmployeeById(id)
    : useGetEmployeeById(empId);
  const [showPersonalProfile, setShowPersonalProfile] = useState(true);
  const togglePersonalProfile = () => {
    setShowPersonalProfile(!showPersonalProfile);
  };
  // if (isLoading || isLoadingUserData) return <>Loading</>;

  return (
    !isLoading && (
      <>
        <ProgressById />
        <div className='employeeBody'>
          <div>
            {!showPersonalProfile && (
              <ButtonComponent
                OnClick={togglePersonalProfile}
                buttonName={'Show Profile'}
              />
            )}
            {showPersonalProfile && (
              <PersonalProfile data={employeeDataById} role={isAdmins} />
            )}
          </div>
          <br />
          <DetailProfile
            data={employeeDataById}
            setShowPersonalProfile={setShowPersonalProfile}
            togglePersonalProfile={() =>
              setShowPersonalProfile(!showPersonalProfile)
            }
            role={isAdmins}
          />
        </div>
      </>
    )
  );
};

export default EmployeeProfile;
