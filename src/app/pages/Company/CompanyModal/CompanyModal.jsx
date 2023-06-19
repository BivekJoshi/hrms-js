import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddCompanyFields from '../../../components/Form/Company/AddCompanyFields';
import EditCompanyFields from '../../../components/Form/Company/EditCompanyFields';
import { useGetCompanyById } from '../../../hooks/company/useCompany';

export const AddCompanyModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddCompanyFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

export const EditCompanyModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetCompanyById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={<EditCompanyFields onClose={handleCloseModal} data={data} />}
        />
      </div>
    )
  }