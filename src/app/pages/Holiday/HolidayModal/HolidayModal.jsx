import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddHolidayFields from '../../../components/Form/Holiday/AddHolidayFields';
import EditEventFields from '../../../components/Form/Event/EditEventFields';
import { useGetHolidayById } from '../../../hooks/holiday/useHoliday';
import EditHolidayFields from '../../../components/Form/Holiday/EditHolidayFields';

export const AddHolidayModal = ({ open, handleCloseModal }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddHolidayFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

export const OpenHoliday = ({ open, handleCloseModal ,id}) => {
  const { data } = useGetHolidayById(id);
  // console.log("hellooooooo",data)
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