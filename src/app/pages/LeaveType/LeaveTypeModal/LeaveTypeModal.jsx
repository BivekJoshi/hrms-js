import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import LeaveTypeFields from '../../../components/Form/LeaveType/LeaveTypeFields';
import { Box } from '@mui/material';
import DeactivatedLeaveTypeFields from '../../../components/Form/LeaveType/DeactivatedLeaveTypeFields';

export const AddLeaveTypeModal = ({ open, handleCloseModal, existingLeaveTypes, title }) => {
  return (
    <Box>
      <FormModal
        open={open}
        title={title}
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

export const EditLeaveTypeModal = ({ open, handleCloseModal, data, title }) => {
  return (
    <Box>
      <FormModal
      title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<LeaveTypeFields onClose={handleCloseModal} data={data} />}
      />
    </Box>
  )
}

export const GetDeactivatedLeaveTypeModal = ({ open, handleCloseModal, data, title, permissions }) => {
  return (
    <Box>
      <FormModal
      width={'fit-content'}
      title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<DeactivatedLeaveTypeFields permissions={permissions} onClose={handleCloseModal} data={data} />}
      />
    </Box>
  )
}