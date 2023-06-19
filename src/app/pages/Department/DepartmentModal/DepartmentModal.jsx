import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddDepartmentFields from '../../../components/Form/Department/AddDepartmentFields';
import EditDepartmentFields from '../../../components/Form/Department/EditDepartmentFields';
import { useGetDepartmentById } from '../../../hooks/department/useDepartment';

export const AddDepartmentModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal 
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddDepartmentFields onClose={handleCloseModal} />}
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
          formComponent={<EditDepartmentFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }