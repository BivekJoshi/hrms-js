import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetLeaveTypeById } from '../../../hooks/leaveType/useLeaveType';
import LeaveTypeFields from '../../../components/Form/LeaveType/LeaveTypeFields';
import { Box } from '@mui/material';

export const AddLeaveTypeModal = ({ open, handleCloseModal, existingLeaveTypes }) => {
  return (
    <Box>
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
    </Box>
  )
}

export const EditLeaveTypeModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetLeaveTypeById(id);
  return (
    <Box>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<LeaveTypeFields onClose={handleCloseModal} data={data} />}
      />
    </Box>
  )
}