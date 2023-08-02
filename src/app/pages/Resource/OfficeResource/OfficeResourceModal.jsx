import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import OfficeResourceFields from '../../../components/Form/Resource/OfficeResource/OfficeResourceFields';
import { useGetOfficeResourceById } from '../../../hooks/resource/officeResource/useOfficeResource';

export const AddOfficeResourceModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal 
        open={open}
        onClose={handleCloseModal}
        formComponent={<OfficeResourceFields onClose={handleCloseModal} />}
      />
    </div>
  )
};

export const EditOfficeResourceModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetOfficeResourceById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<OfficeResourceFields onClose={handleCloseModal} data={data} />}
      />
    </div>
  )
}