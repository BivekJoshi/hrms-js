import React from "react";
import { useParams } from "react-router-dom";

import QualificationAddField from "./QualificationAddField";
import useAddQualificationDetails from "./useAddQualificationDetail";
import CustomeEmployeeDetails from "../../../../utils/CustomeDetails/CustomeEmployeeDetails";
import { useDeleteQualification, useGetQualificationById } from "../../../../hooks/employee/useQualification";

const NewEmployeeQualificationDetailForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetQualificationById(id);
  const { formik, isFormSubmitSuccess, isEditSuccess } = useAddQualificationDetails();
  const deleteHistoryMutation = useDeleteQualification({});

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleDeleteHistory = (history) => {
    if (history?.id) {
      deleteHistoryMutation.mutate(history.id);
    }
  };

  const columns = [
    { id: "board", label: "Board", minWidth: 170 },
    { id: "institute", label: "Institude", minWidth: 150 },
    {
      id: "passedLevel",
      label: "Passed Level",
      minWidth: 150,
    },
    { id: "passedYear", label: "Passed Year", minWidth: 150 },
    { id: "grade", label: "Grade", minWidth: 150 },

    {
      id: "actions",
      label: "Actions",
      minWidth: 50,
      align: "right",
      render: () => {
        return <div>Test</div>;
      },
    },
  ];

  return (
    <div>
      <CustomeEmployeeDetails
        formik={formik}
        title={"Education Detail"}
        columns={columns}
        data={data}
        renderFeilds={<QualificationAddField formik={formik} />}
        isLoading={isLoading}
        handleFormSubmit={handleSubmit}
        isSubmitSuccess={isFormSubmitSuccess || isEditSuccess}
        deleteCallBack={handleDeleteHistory}
      />
    </div>
  );
};

export default NewEmployeeQualificationDetailForm;