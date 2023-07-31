import React from 'react';
import FormModal from '../../../components/Modal/FormModal';
import EmployeeResourceFields from '../../../components/Form/Resource/EmployeeResource/EmployeeResourceFields';
import EditEmployeeResourceFields from '../../../components/Form/Resource/EmployeeResource/EditEmployeeResourceFields';
import { useGetEmployeeResourceById } from '../../../hooks/resource/employeeResource/useEmployeeResource';

export const AddEmployeeResourceModal=({open,handleCloseModal})=>{
    return(
        <div>
            <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<EmployeeResourceFields onClose={handleCloseModal}/>}
            />
        </div>
    )
}
export const EditEmployeeResourceModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetEmployeeResourceById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={<EditEmployeeResourceFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }
