import React from 'react'
import AddDesignationFields from '../../../components/Form/Designation/AddDesignationFields';
import FormModal from '../../../components/Modal/FormModal';
import { useGetDesignationById } from '../../../hooks/designation/useDesignation';
import EditDesignationFields from '../../../components/Form/Designation/EditDesignationFields';

export const AddDesignationModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddDesignationFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

export const EditDesignationModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetDesignationById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={<EditDesignationFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }