import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetDepartmentById } from '../../../hooks/department/useDepartment';
import DepartmentFields from '../../../components/Form/Department/DepartmentFields';

export const AddDepartmentModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal 
        open={open}
        onClose={handleCloseModal}
        formComponent={<DepartmentFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

export const EditDepartmentModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetDepartmentById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={<DepartmentFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }