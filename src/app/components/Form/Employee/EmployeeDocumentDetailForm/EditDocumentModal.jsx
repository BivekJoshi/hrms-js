import React from "react";
import FormModal from "../../../Modal/FormModal";
import EditDocumentFields from "./EditDocumentFields";
import { useGetDocumentByFileId } from "../../../../hooks/employee/useDocument";

export const EditDocumentModal = ({ open, handleCloseModal, id, path }) => {
  const isPDF = path.endsWith(".pdf");
  const title = isPDF ? "Change File" : "Change Image";
  return (
    <div>
      <FormModal
        title={title}
        width={"500px"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditDocumentFields onClose={handleCloseModal} id={id} />
        }
      />
    </div>
  );
};
