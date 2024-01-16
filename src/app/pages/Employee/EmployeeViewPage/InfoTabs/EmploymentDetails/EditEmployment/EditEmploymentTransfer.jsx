import React from "react";
import CustomeEmployeeDetails from "../../../../../../utils/CustomeDetails/CustomeEmployeeDetails";
import useEmploymentHistory from "../../../../../../hooks/employee/useEmploymentHistory";
import AddEmploymentHistoryFields from "../../../../../../components/Form/EmploymentHistory/AddEmploymentHistoryFields";

const EditEmploymentTransfer = ({ data, isLoading }) => {
  const { formik: employmentHistoryFormik } = useEmploymentHistory({data});
  console.log(employmentHistoryFormik,"employmentHistoryFormik");

  const handleFormSubmit = () => {
    employmentHistoryFormik.handleSubmit();
  };

  const columns = [
    {
      id: "department",
      subId: "departmentName",
      label: "Department Name",
      minWidth: 170,
      nested: true,
    },
    {
      id: "branch",
      subId: "branchName",
      label: "Branch Name",
      minWidth: 170,
      nested: true,
    },
    {
      id: "position",
      subId: "positionName",
      label: "Position Hold",
      minWidth: 170,
      nested: true,
    },
    { id: "effectiveDateFrom", label: "From Date", minWidth: 170 },
    { id: "effectiveDateTo", label: "To Date", minWidth: 170 },
    { id: "remarks", label: "Remarks", minWidth: 170 },
    { id: "isActive", label: "Active", minWidth: 170 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 50,
      align: "center",
      render: () => {
        return <div>TEst</div>;
      },
    },
  ];
  return (
    <CustomeEmployeeDetails
      formik={employmentHistoryFormik}
      title={"Employment Detail"}
      columns={columns}
      data={data}
      isLoading={isLoading}
      // handleFormSubmit={handleSubmit}
      // isSubmitSuccess={false}
      // deleteCallBack={handleDeleteFamily}
      renderFeilds={<AddEmploymentHistoryFields formik={employmentHistoryFormik}/>}
      handleFormSubmit={handleFormSubmit}
      modalWidth={400}
      showAddButton={false}
    />
  );
};

export default EditEmploymentTransfer;
