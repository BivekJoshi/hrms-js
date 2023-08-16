import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetCompanyById } from "../../../hooks/company/useCompany";
import CompanyFields from "../../../components/Form/Company/CompanyFields";
import { Box } from "@mui/material";

export const AddCompanyModal = ({ open, handleCloseModal }) => {
  return (
    <Box>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<CompanyFields onClose={handleCloseModal} />}
      />
    </Box>
  );
};

export const EditCompanyModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetCompanyById(id);
  return (
    <Box>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<CompanyFields onClose={handleCloseModal} data={data} />}
      />
    </Box>
  );
};
