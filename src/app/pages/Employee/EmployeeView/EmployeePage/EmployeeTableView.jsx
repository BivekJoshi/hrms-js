import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CustomTable from "../../../../components/CustomTable/CustomTable";

const EmployeeTableView = ({ employeeData, isLoading }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "SN",
      field: "tableData.id",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      pdfWidth: "2rem",
      maxWidth: "50px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Employee",
      field: "firstName",
      pdfWidth: "10rem",
      render: (rowData) =>
        `${rowData?.firstName} ${rowData?.middleName || ""} ${
          rowData?.lastName
        }`,
      // width: "10%",
      sorting: false,
    },
    {
      title: "Position",
      pdfWidth: "8rem",
      field: "position",
      render: (rowData) => {
        const position = `${rowData?.positionName || "-"}`;
        // (${rowData?.position?.positionLevel || ""})`
        return position ? position : "";
      },
      width: 340,
      sorting: false,
    },
    {
      title: "Email",
      field: "officeEmail",
      pdfWidth: "12rem",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Contact No.",
      field: "mobileNumber",
      pdfWidth: "10rem",
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
      icon: () => (
        <EditIcon
          sx={{
            color: "black",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      tooltip: "Edit Detail",
      onClick: (event, rowData) => handleEditEmployee(rowData),
    },
    {
      icon: () => (
        <RemoveRedEyeOutlinedIcon
          sx={{
            color: "black",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      tooltip: "View Details",
      onClick: (event, rowData) => handleViewEmployee(rowData),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={employeeData?.employees}
      title="Employees"
      fileName="Employee-Report.pdf"
      isLoading={isLoading}
      actions={actions}
      exportButton={true}
      exportExcel
    />
  );
};

export default EmployeeTableView;
