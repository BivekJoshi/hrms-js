import MaterialTable from "material-table";
import React from "react";
import tableIcons from "../../../../theme/overrides/TableIcon";
import {  useGetDeactivatedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Button, Stack } from "@mui/material";
import useOfficeResourceInactiveForm from "../../../hooks/resource/officeResource/OfficeResourceForm/useOfficeResourceInactiveForm";

const DeactivatedOfficeResource = () => {
  const { data, isLoading } = useGetDeactivatedOfficeResource();

  const { formik } = useOfficeResourceInactiveForm(data);
  const handleActivate = (rowData) => {
    const id = rowData.id;
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sorting: false,
    },
    {
      title: "Appliance Name",
      field: "name",
      emptyValue: "-",
      width: "18.75rem",
      sorting: false,
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
      width: "18.75rem",
      sorting: false,
    },
    {
      title: "Description",
      field: "description",
      emptyValue: "-",
      width: "57rem",
      sorting: false,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleActivate(rowData)}>
            Activate
          </Button>
        </Stack>
      ),
      sorting: false,
    },
  ];
  return (
    <MaterialTable
      icons={tableIcons}
      title="Deactivated Office Logistics"
      columns={columns}
      data={data}
      isLoading={isLoading}
      options={{
        exportButton: true,
        padding: "dense",
        margin: 50,
        pageSize: 20,
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
  );
};

export default DeactivatedOfficeResource;
