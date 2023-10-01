import * as React from "react";
import MaterialTable from "material-table";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HocButton from "../../../hoc/hocButton";
import tableIcons from "../../../../theme/overrides/TableIcon";

const CompanyTableView = ({ permissions, companyData, isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {

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
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
           <HocButton
            permissions={permissions?.canEdit}
            onClick={() => handleEditCompany(rowData)}
            icon={<ModeEditOutlineIcon />}
          />
          <HocButton
            permissions={permissions?.canDelete}
            onClick={() => handleDeleteCompany(rowData)}
            icon={<DeleteIcon />}
          />
        </Stack>
      ),
      sorting: false,
      width: 80,
    },
  ].filter(Boolean);

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
        // actions={actions}
      />
    </>
  );
};

export default CompanyTableView;