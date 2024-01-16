import React from "react";
import { useGetAvailableOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import CustomTable from "../../../components/CustomTable/CustomTable";

export const AvailableOfficeLogistic = (props) => {
  const { data, isLoading } = useGetAvailableOfficeResource();
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
    {
      title: "Active",
      field: "isActive",
      emptyValue: "-",
      width: "57rem",
      sorting: false,
    },
  ];
  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        title="Activated Office Logistics"
        isLoading={isLoading}
        fileName="Activated Office Logistics"
        exportButton
        exportExcel
        pdfNone
      />
    </>
  );
};
