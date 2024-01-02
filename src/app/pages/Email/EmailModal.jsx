import React from "react";
import EmailForm from "./Email";
import FormModal from "../../components/Modal/FormModal";

const EmailModal = ({ open, onClose, employeeId, officeEmail, title }) => {
  return (
    <>
      <FormModal
        title={"Send Email"}
        open={open}
        onClose={onClose}
        formComponent={
          <EmailForm
            employeeId={employeeId}
            onClose={onClose}
            officeEmail={officeEmail}
          />
        }
      />
    </>
  );
};

export default EmailModal;
