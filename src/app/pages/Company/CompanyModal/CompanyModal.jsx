import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetCompanyById } from "../../../hooks/company/useCompany";
import CompanyFields from "../../../components/Form/Company/CompanyFields";

export const AddCompanyModal = ({ open, handleCloseModal }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<CompanyFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditCompanyModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetCompanyById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <CompanyFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
