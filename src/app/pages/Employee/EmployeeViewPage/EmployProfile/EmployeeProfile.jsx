import React, { useState } from "react";
import {
  useGetEmployeeById,
  useGetLoggedInUserInfo,
} from "../../../../hooks/employee/useEmployee";
import { useParams } from "react-router-dom";

import "./Style/Style.css";
import { DetailProfile } from "./Component/DetailProfile";
import { PersonalProfile } from "./Component/PersonalProfile";
import ProgressById from "../../ProgressEmployeeData/ProgressById";
import useAuth from "../../../../../auth/hooks/component/login/useAuth";
import { EmployeeDetailProfile } from "./Component/EmployeeDetailProfile";
import { useGetLoggedInUser } from "../../../../hooks/auth/usePassword";

const EmployeeProfile = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();
  const { id } = useParams();
  const { data: userData } = useGetLoggedInUser();
  const empId = userData && userData?.employeeId;
  const isAdmins = isSuperAdmin || isAdmin || isHrAdmin || isHr || isManager;
  const { data: employeeDataById, isLoading } = isAdmins ? useGetEmployeeById(id) : useGetEmployeeById(empId);
  // const { data: employeeDataById, isLoading } = (isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager) ?? useGetEmployeeById(adminId);
  // const { data: loggedInUserData ,isLoading:isLoadingUserData} = useGetEmployeeById(empId);
  // if (isLoading||isLoadingUserData) return <>Loading</>;

  return (
    !isLoading && (
      <>
        <ProgressById />
        <PersonalProfile data={employeeDataById} role={isAdmins} />
        <DetailProfile data={employeeDataById} role={isAdmins} />
      </>
    )
  );
};

export default EmployeeProfile;
