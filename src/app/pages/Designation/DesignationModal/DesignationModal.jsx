import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetDesignationById } from '../../../hooks/designation/useDesignation';
import DesignationFields from '../../../components/Form/Designation/DesignationFields';

export const AddDesignationModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<DesignationFields onClose={handleCloseModal} />}
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
          formComponent={<DesignationFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }