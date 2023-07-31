import React, {useState} from "react";
import { useGetEmployeeById } from "../../../../hooks/employee/useEmployee";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import "./Style/Style.css";
import { DetailProfile } from "./Component/DetailProfile";
import { PersonalProfile } from "./Component/PersonalProfile";
import ProgressById from "../../ProgressEmployeeData/ProgressById";
import { useGetDocumentById } from "../../../../hooks/employee/useDocument";

const EmployeeProfile = () => {
  const { id } = useParams();
  const { data: employeeDataById, isLoading } = useGetEmployeeById(id);
  const { data : employeePhoto } = useGetDocumentById(id);

  const navigate = useNavigate();

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
        <PersonalProfile data={employeeDataById} photo={employeePhoto} />
        <DetailProfile data={employeeDataById} />
      </div>
    </>
  );
};

export default EmployeeProfile;