import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetLeaveById } from '../../../hooks/leave/useLeave';
import { EditLeaveFields, LeaveFields } from '../../../components/Form/Leave/LeaveFields';

export const AddLeaveModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<LeaveFields onClose={handleCloseModal} />}
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