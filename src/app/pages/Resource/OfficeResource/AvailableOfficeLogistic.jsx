import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetAvailableOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";

export const AvailableOfficeLogistic = (props) => {
  const { data, isLoading} = useGetAvailableOfficeResource(); 
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sorting: false,
    },
    {
      title: "Resource Name",
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
    // {
    //   title: "Active",
    //   field: "isActive",
    //   emptyValue: "-",
    //   width: "57rem",
    //   sorting: false,
    // },
  ];
  return (
    <>
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
        pageSize: 5,
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
