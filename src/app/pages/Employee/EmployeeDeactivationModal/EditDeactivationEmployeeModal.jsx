import React from "react";
import { EditEmployeeActivateFields, EditEmployeeDeactivateFields } from "../../../components/Form/Employee/DeactivateEmployee/EditEmployeeDeactivateFields";
import { useGetEmployeeById } from "../../../hooks/employee/useEmployee";
import FormModal from "../../../components/Modal/FormModal";
import { useGetDeactivatedEmployee } from "../../../hooks/employee/DeactivateEmploye/useEmployee";

export const EditDeactivationEmployeeModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetEmployeeById(id);    
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditEmployeeDeactivateFields onClose={handleCloseModal} data={data} />} />
        </div>
    )
}

export const EditActivationEmployeeModal = ({ open, handleCloseModal, id }) => {
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditEmployeeActivateFields onClose={handleCloseModal} id={id}/>} />
        </div>
    )
}