import { EditEmployeeActivateFields, EditEmployeeDeactivateFields } from "../../../components/Form/Employee/DeactivateEmployee/EditEmployeeDeactivateFields";
import { useGetEmployeeById } from "../../../hooks/employee/useEmployee";

export const AddEmployeeActiveModal = ({open, handleCloseModal, id}) => {
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<EditEmployeeActivateFields onClose={handleCloseModal} data={id} />}
        />
    )
}

export const DeactivateEmployeeModal = ({ open, handleCloseModal, id }) => {
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