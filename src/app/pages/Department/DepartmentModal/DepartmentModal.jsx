import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetDepartmentById } from "../../../hooks/department/useDepartment";
import DepartmentFields from "../../../components/Form/Department/DepartmentFields";

export const AddDepartmentModal = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<DepartmentFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditDepartmentModal = ({ open, handleCloseModal, title, data }) => {
  // const { data } = useGetDepartmentById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <DepartmentFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
