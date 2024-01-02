import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import OfficeResourceFields from "../../../components/Form/Resource/OfficeResource/OfficeResourceFields";
import { useGetOfficeResourceById } from "../../../hooks/resource/officeResource/useOfficeResource";
import EditOfficeResourceActivationFields from "../../../components/Form/Resource/OfficeResource/EditOfficeResourceActivationFields";
import DeactivatedOfficeResource from './DeactivatedOfficeResource';

export const AddOfficeResourceModal = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<OfficeResourceFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditOfficeResourceModal = ({
  open,
  handleCloseModal,
  data,
  title,
}) => {
  // const { data } = useGetOfficeResourceById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <OfficeResourceFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};

export const OfficeResourceLogisticsModal = ({
  open,
  handleCloseModal,
  id,
  title,
}) => {
  return (
    <div>
      <FormModal
        title={title}
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



export const DeactivatedOfficeResourceModal = ({
  open,
  handleCloseModal,
  data,
  title,
}) => {
  // const { data } = useGetOfficeResourceById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <DeactivatedOfficeResource onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};