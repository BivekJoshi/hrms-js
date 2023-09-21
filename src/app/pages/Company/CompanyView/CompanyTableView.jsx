import * as React from "react";
import MaterialTable from "material-table";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HocButton from "../../../hoc/hocButton";
import PermissionHoc from "../../../hoc/permissionHoc";
import tableIcons from "../../../../theme/overrides/TableIcon";
import useAuth from "../../../../auth/hooks/component/login/useAuth";

const CompanyTableView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  const {isEmployee}=useAuth();

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Company Name",
      field: "companyName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Company Type",
      field: "companyType",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Description",
      field: "companyDescription",
      emptyValue: "-",
      width: 400,
      sorting: false,
    },
  ];

  const actions = [
    {
      icon: () => (<ModeEditOutlineIcon />
        // <HocButton
        //   permissions={permissions?.canEdit}
        //   icon={<ModeEditOutlineIcon />}
        // />
      ),
      tooltip: "Edit Company",
      onClick: (event, rowData) => handleEditCompany(rowData),
    },
    {
      icon: () => (<DeleteIcon />
        // <HocButton permissions={permissions?.canDelete} icon={<DeleteIcon />} />
      ),
      tooltip: "Delete Company",
      onClick: (event, rowData) => handleDeleteCompany(rowData),
    },
  ];

  if (isEmployee) {
    actions.length = 0;
  }

  if (isLoading) return <>Loading</>;
  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={companyData}
        title="Company List"
        isLoading={isLoading}
        options={{
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 10,
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

export default PermissionHoc(CompanyTableView);
