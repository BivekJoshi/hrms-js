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
import AddUser from "../../../../pages/Auth/UserControl/AddUser";

const EmployeeProfile = () => {
  const { id } = useParams();
  const { data: employeeDataById, isLoading } = useGetEmployeeById(id);
  const navigate = useNavigate();

  if (isLoading) return <>Loading</>;

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

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
          <Button variant="contained" onClick={handleAddOpenModal}>Add User</Button>
      </div>
      <ProgressById />

      <div className="employeeBody">
        <PersonalProfile data={employeeDataById} />
        <DetailProfile data={employeeDataById} />
      </div>

      {openAddModal && (
        <AddUser
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default EmployeeProfile;