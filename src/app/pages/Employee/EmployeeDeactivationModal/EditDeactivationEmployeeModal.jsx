import React from "react";
import { EditEmployeeDeactivateFields } from "../../../components/Form/Employee/DeactivateEmployee/EditEmployeeDeactivateFields";
import { useGetEmployeeById } from "../../../hooks/employee/useEmployee";
import FormModal from "../../../components/Modal/FormModal";

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