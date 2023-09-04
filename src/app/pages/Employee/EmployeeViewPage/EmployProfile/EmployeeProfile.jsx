import React, { useState } from "react";
import { useGetEmployeeById, useGetLoggedInUserInfo } from "../../../../hooks/employee/useEmployee";
import { useParams } from "react-router-dom";

import "./Style/Style.css";
import { DetailProfile } from "./Component/DetailProfile";
import { PersonalProfile } from "./Component/PersonalProfile";
import ProgressById from "../../ProgressEmployeeData/ProgressById";
import useAuth from "../../../../../auth/hooks/component/login/useAuth";

const EmployeeProfile = () => {
  const {
    isSuperAdmin,
    isAdmin,
    isHr,
    isEmployee,
    isHrAdmin,
    isManager,
  } = useAuth();

  const { id } = useParams();
  const { data: employeeDataById, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetEmployeeById(id)
      : {};

  const { data: loggedInUserData } = isEmployee ? useGetLoggedInUserInfo() : {};


  if (isLoading) return <>Loading</>;

  return (
    <>
      <ProgressById />
      <div className="employeeBody">
        {isSuperAdmin || isAdmin || isHrAdmin || isHr || isManager ? (
          <>
            <PersonalProfile data={employeeDataById} />
            <DetailProfile data={employeeDataById} />
          </>
        ) : (
          <>
            <PersonalProfile data={loggedInUserData} />
            <DetailProfile data={loggedInUserData} />
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeProfile;
