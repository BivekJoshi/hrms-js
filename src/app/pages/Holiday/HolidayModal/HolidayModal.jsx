import React, { useState } from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetHolidayById } from '../../../hooks/holiday/useHoliday';
import EditHolidayFields from '../../../components/Form/Holiday/EditHolidayFields';

export const OpenHoliday = ({ open, handleCloseModal ,id}) => {
  const { data } = useGetHolidayById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<EditHolidayFields onClose={handleCloseModal} data={data}/>}
      />
    </div>
  )
}