import React, {useState} from "react";
import { useGetEmployeeById } from "../../../../hooks/employee/useEmployee";
import { useParams } from "react-router-dom";

import "./Style/Style.css";
import { DetailProfile } from "./Component/DetailProfile";
import { PersonalProfile } from "./Component/PersonalProfile";
import ProgressById from "../../ProgressEmployeeData/ProgressById";
// import AddUser from "../../../../pages/Auth/UserControl/AddUser";

const EmployeeProfile = () => {
  const { id } = useParams();
  const { data: employeeDataById, isLoading } = useGetEmployeeById(id);

  if (isLoading) return <>Loading</>;

  return (
    <>
      <ProgressById />

      <div className="employeeBody">
        <PersonalProfile data={employeeDataById} />
        <DetailProfile data={employeeDataById} />
      </div>

    </>
  );
};

export default EmployeeProfile;