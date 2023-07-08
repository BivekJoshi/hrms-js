import React from "react";
// import FormModal from "../../components/Modal/FormModal";
// import EmailForm from "./Email";
// import { useParams } from "react-router-dom";
import EmailForm from "./Email";
import FormModal from "../../components/Modal/FormModal";

const EmailModal = ({ open, onClose, employeeId, officeEmail }) => {
  return (
    <>
      {/* {JSON.stringify(employeeId)} */}
      <FormModal
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
