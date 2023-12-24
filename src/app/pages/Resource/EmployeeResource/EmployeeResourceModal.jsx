import React from 'react';
import FormModal from '../../../components/Modal/FormModal';
import EmployeeResourceFields from '../../../components/Form/Resource/EmployeeResource/EmployeeResourceFields';
import { useGetEmployeeResourceById } from '../../../hooks/resource/employeeResource/useEmployeeResource';

export const AddEmployeeResourceModal=({open,handleCloseModal, title})=>{
    return(
        <div>
            <FormModal
            title={title}
            open={open}
            onClose={handleCloseModal}
            formComponent={<EmployeeResourceFields onClose={handleCloseModal}/>}
            />
        </div>
    )
}
export const EditEmployeeResourceModal = ({ open, handleCloseModal, data, title }) => {
    return (
      <div>
        <FormModal
        title={title}
          open={open}
          onClose={handleCloseModal}
          formComponent={<EmployeeResourceFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }
