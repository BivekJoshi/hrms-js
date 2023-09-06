import React, { useState } from "react";

import FormModal from "../../../components/Modal/FormModal";
import { useGetEventById } from "../../../hooks/event/useEvent";
import EditEventFields from "../../../components/Form/Event/EditEventFields";


export const OpenEvent = ({ open, handleCloseModal, id }) => {
  const { data } = useGetEventById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditEventFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
