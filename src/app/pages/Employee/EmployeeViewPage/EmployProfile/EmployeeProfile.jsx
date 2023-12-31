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
import { Typography } from "@mui/material";
import { ButtonComponent } from "../../../../components/Button/ButtonComponent";

const EmployeeProfile = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();

  const { id } = useParams();
  const { data: employeeDataById, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetEmployeeById(id)
      : {};

  const { data: userData } = useGetLoggedInUser();
  const empId = userData && userData?.employeeId;
  const { data: loggedInUserData, isLoading: isLoadingUserData } =
    useGetEmployeeById(empId);
  const [showPersonalProfile, setShowPersonalProfile] = useState(true);
  const togglePersonalProfile = () => {
    setShowPersonalProfile(!showPersonalProfile);
  };
  if (isLoading || isLoadingUserData) return <>Loading</>;

  return (
    <>
      <ProgressById />
      <div className="employeeBody">
        {isSuperAdmin || isAdmin || isHrAdmin || isHr || isManager ? (
          <div>
            <div>
              <Typography
                padding="1rem 1rem 1rem 0"
                onClick={togglePersonalProfile}
                sx={{ cursor: "pointer" }}
              >
                {!showPersonalProfile && (
                  <ButtonComponent buttonName={"Show Profile"} />
                  // Show Profile <Person2Icon sx={{ fontSize: "2rem" }} />
                )}
              </Typography>
              {showPersonalProfile && (
                <PersonalProfile data={employeeDataById} />
              )}
            </div>
            <DetailProfile
              data={employeeDataById}
              setShowPersonalProfile={setShowPersonalProfile}
              togglePersonalProfile={() =>
                setShowPersonalProfile(!showPersonalProfile)
              }
            />
          </div>
        ) : (
          <>
            <PersonalProfile data={loggedInUserData} empId={empId} />
            <EmployeeDetailProfile data={loggedInUserData} />
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeProfile;
