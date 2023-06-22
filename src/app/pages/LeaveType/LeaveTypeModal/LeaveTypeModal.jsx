import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddLeaveTypeFields from '../../../components/Form/LeaveType/AddLeaveTypeFields';
import EditLeaveTypeFields from '../../../components/Form/LeaveType/EditLeaveTypeFields';
import { useGetLeaveTypeById } from '../../../hooks/leaveType/useLeaveType';

export const AddLeaveTypeModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddLeaveTypeFields onClose={handleCloseModal} />}
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
          formComponent={<EditLeaveTypeFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }