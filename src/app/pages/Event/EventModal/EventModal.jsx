import React, { useState } from "react";

import FormModal from "../../../components/Modal/FormModal";
import { useGetEventById } from "../../../hooks/event/useEvent";
import EditEventFields from "../../../components/Form/Event/EditEventFields";
import EditEmpEventFields from '../../../components/Form/Event/EditEmpEventFields';

export const OpenEvent = ({ open, handleCloseModal, id, title }) => {
  const { data } = useGetEventById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditEventFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};

export const OpenEmpEvent = ({ open, handleCloseModal, id, title }) => {
  const { data } = useGetEventById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<EditEmpEventFields onClose={handleCloseModal} data={data} />}
      />
    </div>
  );
};
