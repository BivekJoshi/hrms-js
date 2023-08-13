import MaterialTable from "material-table";
import React from "react";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetDeactivatedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";

const DeactivatedOfficeResource = () => {
  const {
    data: deactivatedOfficeResourceData,
    isLoading,
  } = useGetDeactivatedOfficeResource();

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
    },
    {
      title: "Appliance Name",
      field: "name",
      emptyValue: "-",
      width: "18.75rem",
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
      width: "18.75rem",
    },
    {
      title: "Description",
      field: "description",
      emptyValue: "-",
      width: "57rem",
    },
  
  ];
  return (
    <MaterialTable
      icons={tableIcons}
      title="Deactivated Office Resource"
      columns={columns}
      data={deactivatedOfficeResourceData}
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
