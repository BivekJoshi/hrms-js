import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetLeaveById } from '../../../hooks/leave/useLeave';
import { EditLeaveFields, LeaveFields } from '../../../components/Form/Leave/LeaveFields';

export const AddLeaveModal = ({ open, handleCloseModal, title}) => {
  return (
    <div>
      <FormModal
      title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<LeaveFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

export const EditLeaveModal = ({ open, handleCloseModal, data, title }) => {
    // const { data } = useGetLeaveById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          title={title}
          formComponent={<EditLeaveFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }