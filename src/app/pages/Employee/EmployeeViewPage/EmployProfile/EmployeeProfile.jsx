import React from "react";
import { useGetEmployeeById } from "../../../../hooks/employee/useEmployee";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Typography, Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import "./Style/Style.css";
import { DetailProfile } from "./Component/DetailProfile";
import { PersonalProfile } from "./Component/PersonalProfile";
import ProgressById from "../../ProgressEmployeeData/ProgressById";

const primaryColor = "#1c7ed6";

export const EmployeeProfile = () => {
  const { id } = useParams();
  const { data: employeeDataById, isLoading } = useGetEmployeeById(id);
  const navigate = useNavigate();
  const MiddleName =
    employeeDataById?.middleName === null ? " " : employeeDataById?.middleName;
  if (isLoading) return <>Loading</>;
  return (
    <>
      <div className="header">
        <Button
          size="large"
          sx={{ bgcolor: "#1c7ed6" }}
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          <KeyboardBackspaceIcon />
        </Button>
      </div>
      <ProgressById />

      <div className="employeeBody">
        <PersonalProfile data={employeeDataById} />
        <DetailProfile data={employeeDataById} />
      </div>
    </>
  );
};
