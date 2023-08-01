import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetLeaveTypeById } from '../../../hooks/leaveType/useLeaveType';
import LeaveTypeFields from '../../../components/Form/LeaveType/LeaveTypeFields';

export const AddLeaveTypeModal = ({ open, handleCloseModal, existingLeaveTypes }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <LeaveTypeFields
            onClose={handleCloseModal}
            existingLeaveTypes={existingLeaveTypes}
          />
        }
      />
    </div>
  )
}

export const EditLeaveTypeModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetLeaveTypeById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<LeaveTypeFields onClose={handleCloseModal} data={data} />}
      />
    </div>
  )
}