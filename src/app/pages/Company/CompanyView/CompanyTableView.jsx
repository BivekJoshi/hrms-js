import * as React from "react";
import MaterialTable from "@material-table/core";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HocButton from "../../../hoc/hocButton";
import PermissionHoc from "../../../hoc/permissionHoc";

const CompanyTableView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  console.log({"permissions" : permissions})
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 80,
      sortable: false,
      sorting: false,
    },
    {
      title: "Company Name",
      field: "companyName",
      emptyValue: "-",
      width: 180,
      sorting: false,
    },
    {
      title: "Company Type",
      field: "companyType",
      emptyValue: "-",
      width: 170,
      sorting: false,
    },
    {
      title: "Description",
      field: "companyDescription",
      emptyValue: "-",
      width: 400,
      sorting: false,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <HocButton
            permissions={permissions?.canEdit}
            onClick={() => handleEditCompany(rowData)}
            icon={<EditIcon />}
          />

          <HocButton
            permissions={permissions?.canDelete}
            onClick={() => handleDeleteCompany(rowData)}
            icon={<DeleteIcon />}
          />
        </Stack>
      ),
      sorting: false,

      width: 120,
    },
  ];

  return (
    <>
      <MaterialTable
        columns={columns}
        data={companyData}
        title="Company List"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
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
      />
    </>
  );
};

export default CompanyTableView;