import MaterialTable from "material-table";
import React from "react";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetLeaveType } from "../../../hooks/leaveType/useLeaveType";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";

const PendingLeaveTable = ({ pendingLeaveData, loading }) => {
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();
  const {
    data: leaveTypeData,
    isLoading: loadingleaveType,
  } = useGetLeaveType();

  const getEmployeeName = (rowData) => {
    const employeeId = rowData.employeeId;
    const employee = employeeData?.find((emp) => emp.id === employeeId);
    const name = `${employee?.firstName} ${employee?.middleName || ""} ${
      employee?.lastName
    }`;
    return name;
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const getLeaveTypeName = (rowData) => {
    const leaveTypeId = rowData?.leaveTypeId;
    const leaveType = leaveTypeData?.find((leave) => leave?.id === leaveTypeId);
    const name = `${capitalizeFirstLetter(leaveType?.leaveName)} Leave`;
    return name;
  };

  const columns = [
    {
      title: "Employee Name",
      render: (rowData) => {
        return <p>{getEmployeeName(rowData)} </p>;
      },
      width: 120,
    },
    {
      title: "Leave Type",
      render: (rowData) => {
        return <p>{getLeaveTypeName(rowData)}</p>;
      },
      width: 150,
    },
    {
      title: "Leave Reason",
      field: "leaveReason",
      emptyValue: "-",
      width: 100,
    },
  ];
  return (
    !loading &&(
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={pendingLeaveData}
      title="Pending Leave Request"
      isLoading={loading}
      options={{
        search:false,
        padding: "dense",
        margin: 50,
        pageSize: 5,
        // emptyRowsWhenPaging: false,
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
          fontSize: "1rem",
          padding: "dense",
          height: 50,
          textAlign: "center",
          minHeight: "10px",
          textTransform: "capitilize",
        },
        rowStyle: {
          fontSize: ".8rem",
        },
      }}
    />
  )
  );
};

export default PendingLeaveTable;
