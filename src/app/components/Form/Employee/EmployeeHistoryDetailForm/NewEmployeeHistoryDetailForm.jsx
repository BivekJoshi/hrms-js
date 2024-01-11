import React from "react";
import { useParams } from "react-router-dom";

import {
  useDeleteHistory,
  useGetEmployeeHistory,
  useGetEmployeeHistoryById,
} from "../../../../hooks/employee/useEmployeeHistory";
import CustomeEmployeeDetails from "../../../../utils/CustomeDetails/CustomeEmployeeDetails";
import HistoryAddField from "./HistoryAddField";
import useAddHistoryDetails from "./useAddHistoryDetails";

const NewEmployeeHistoryDetailForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeHistory(id);
  const { formik, isFormSubmitSuccess, isEditSuccess } = useAddHistoryDetails();
  const deleteHistoryMutation = useDeleteHistory({});

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleDeleteHistory = (history) => {
    if (history?.id) {
      deleteHistoryMutation.mutate(history.id);
    }
  };

  const columns = [
    { id: "employerName", label: "Organaization Name", minWidth: 170 },
    { id: "employerAddress", label: "Organaization Address", minWidth: 150 },
    {
      id: "pastPosition",
      label: "Past Position",
      minWidth: 150,
    },
    { id: "fromDate", label: "From Date", minWidth: 150 },
    { id: "toDate", label: "To Date", minWidth: 150 },
    { id: "remarks", label: "Remarks", minWidth: 150 },
    { id: "experiencePath", label: "File" },
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
        title={"Work History"}
        columns={columns}
        data={data}
        renderFeilds={<HistoryAddField formik={formik} />}
        isLoading={isLoading}
        handleFormSubmit={handleSubmit}
        isSubmitSuccess={isFormSubmitSuccess || isEditSuccess}
        deleteCallBack={handleDeleteHistory}
        modalWidth={500}
        // modalHeight={"70vh"}
      />
    </div>
  );
};

export default NewEmployeeHistoryDetailForm;
