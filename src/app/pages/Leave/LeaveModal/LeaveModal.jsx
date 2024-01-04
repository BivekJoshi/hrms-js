import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { EditLeaveFields } from "../../../components/Form/Leave/LeaveFields";
import { LeaveFields } from "../../../components/Form/Leave/AddLeavefield";

export const AddLeaveModal = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        width={500}
        open={open}
        onClose={handleCloseModal}
        formComponent={<LeaveFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditLeaveModal = ({ open, handleCloseModal, data, title }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        title={title}
        formComponent={
          <EditLeaveFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
