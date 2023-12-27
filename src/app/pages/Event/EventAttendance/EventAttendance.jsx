import React from 'react';
import { useGetEventAttenderList } from '../../../hooks/event/useEvent';

const EventAttendance = () => {
  const { data: eventAttendanceData, isLoading: eventLoading } = useGetEventAttenderList();

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Department Name",
      field: "userName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "mobileNumber",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "eventName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "eventDate",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "eventTime",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "eventLocation",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "eventDescription",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Name",
      field: "isPresent",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
  ].filter(Boolean);

  return !eventLoading && (
    <>
    
    </>
  );
};

export default EventAttendance;
