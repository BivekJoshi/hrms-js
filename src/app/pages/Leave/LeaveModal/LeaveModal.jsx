import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddLeaveFields from '../../../components/Form/Leave/AddLeaveFields';
import EditLeaveFields from '../../../components/Form/Leave/EditLeaveFields';
import { useGetLeaveById } from '../../../hooks/leave/useLeave';

export const AddLeaveModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddLeaveFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

export const EditLeaveModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetLeaveById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={<EditLeaveFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }