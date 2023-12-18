import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetCompanyById } from "../../../hooks/company/useCompany";
import CompanyFields from "../../../components/Form/Company/CompanyFields";
import { Box } from "@mui/material";

export const AddCompanyModal = ({ open, handleCloseModal, title }) => {
  return (
    <Box>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<CompanyFields onClose={handleCloseModal} />}
      />
    </Box>
  );
};

export const EditCompanyModal = ({ open, handleCloseModal, data, title }) => {
  // const { data } = useGetCompanyById(id);
  return (
    <Box>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<CompanyFields onClose={handleCloseModal} data={data} />}
      />
    </Box>
  );
};
