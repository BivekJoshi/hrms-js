import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import { useGetHolidayById } from '../../../hooks/holiday/useHoliday';
import HolidayFields from '../../../components/Form/Holiday/HolidayFields';

export const OpenHoliday = ({ open, handleCloseModal ,id}) => {
  const { data } = useGetHolidayById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<HolidayFields onClose={handleCloseModal} data={data}/>}
      />
    </div>
  )
}