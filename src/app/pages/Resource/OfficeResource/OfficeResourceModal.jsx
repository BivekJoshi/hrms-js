import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import OfficeResourceFields from "../../../components/Form/Resource/OfficeResource/OfficeResourceFields";
import { useGetOfficeResourceById } from "../../../hooks/resource/officeResource/useOfficeResource";
import EditOfficeResourceActivationFields from "../../../components/Form/Resource/OfficeResource/EditOfficeResourceActivationFields";

export const AddOfficeResourceModal = ({ open, handleCloseModal }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<OfficeResourceFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditOfficeResourceModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetOfficeResourceById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <OfficeResourceFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};

export const OfficeResourceLogisticsModal = ({ open, handleCloseModal, id }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditOfficeResourceActivationFields
            onClose={handleCloseModal}
            id={id}
          />
        }
      />
    </div>
  );
};
