import React, { useState } from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetHolidayById } from "../../../hooks/holiday/useHoliday";
import EditHolidayFields from "../../../components/Form/Holiday/EditHolidayFields";
import EditEmpHolidayFields from "../../../components/Form/Holiday/EditEmpHolidayFields";

export const OpenHoliday = ({ open, handleCloseModal, id, title }) => {
  const { data } = useGetHolidayById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditHolidayFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};

export const OpenEmpHoliday = ({ open, handleCloseModal, id, title }) => {
  console.log(id)
  const { data } = useGetHolidayById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditEmpHolidayFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
