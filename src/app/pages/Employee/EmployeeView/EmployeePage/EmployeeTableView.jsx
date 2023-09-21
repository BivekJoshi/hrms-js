import * as React from "react";
import MaterialTable from "material-table";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import tableIcons from "../../../../../theme/overrides/TableIcon";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const EmployeeTableView = ({ employeeData, isLoading }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      maxWidth: "50px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Employee",
      field: "firstName",
      render: (rowData) =>
        `${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`,
      // width: "10%",
      sorting: false,
    },
    {
      title: "Position",
      render: (rowData) => {
        const position = `${rowData?.position?.positionName || "-"} (${
          rowData?.position?.positionLevel || "-"
        })`;
        return position ? position : "-";
      },
      width: 340,
      sorting: false,
    },
    {
      title: "Email",
      field: "officeEmail",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Contact No.",
      field: "mobileNumber",
      emptyValue: "-",
      sorting: false,
    },
  ].filter(Boolean);

  const handleEditEmployee = (rowData) => {
    navigate(`edit/${rowData.id}`);
  };

  const handleViewEmployee = (rowData) => {
    navigate(`${rowData.id}`);
  };

  const actions = [
    {
      icon: () => <EditIcon sx={{ color: "#01579B" }} />,
      tooltip: "Edit Detail",
      onClick: (event, rowData) => handleEditEmployee(rowData),
    },
    {
      icon: () => <RemoveRedEyeOutlinedIcon sx={{ color: "#01579B" }} />,
      tooltip: "View Details",
      onClick: (event, rowData) => handleViewEmployee(rowData),
    },
  ];

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={employeeData}
        title="Employees"
        isLoading={isLoading}
        options={{
          toolbar: true,
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
            textAlign: "center",
            border: "2px solid #fff",
            minHeight: "10px",
            textTransform: "capitilize",
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
        actions={actions}
      />
    </>
  );
};

export default EmployeeTableView;
