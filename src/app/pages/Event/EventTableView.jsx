import React from "react";
import CustomTable from "../../components/CustomTable/CustomTable";

const EventTableView = ({ eventData, isLoading }) => {
  console.log(eventData, "eventData");

  const columns = [
    {
      title: "SN",
      field: "tableData.id",
      width: "1%",
      render: (rowData) => rowData?.tableData?.id + 1,
    },
    {
      title: "Event Name",
      field: "eventName",
      emptyValue: "-",
      width: "80px",
      cellStyle: {
        textAlign: "start",
      },
      sorting: "false",
    },
    {
      title: "Event Date",
      field: "eventDate",
      emptyValue: "-",
      width: "80px",
      sorting: "false",
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Event Time",
      field: "eventTime",
      emptyValue: "-",
      width: "80px",
      sorting: "false",
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Event Location",
      field: "eventLocation",
      emptyValue: "-",
      width: "80px",
      sorting: "false",
      cellStyle: {
        textAlign: "start",
        whiteSpace: "normal",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-all",
      },
    },
    {
      title: "Event Description",
      field: "eventDescription",
      emptyValue: "-",
      width: "120px",
      cellStyle: {
        textAlign: "start",
      },
      render: (rowData) => (
        <div
          style={{
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          {rowData?.eventDescription}
        </div>
      ),
    },
  ];
  return (
    <CustomTable
      columns={columns}
      data={eventData}
      title="Event List"
      isLoading={isLoading}
      // actions={actions}
      fileName="Event List"
      exportButton
      exportExcel
      pdfNone
    />
  );
};

export default EventTableView;
