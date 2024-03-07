import React, { useState } from "react";
import { useGetAttendance } from "../../hooks/attendance/useAttendance";
import MaterialTable from "@material-table/core";
import { TableCell, TableRow } from "@mui/material";
import FilterForm from "./FilterForm";
import dateConverter from "../../../theme/dateConverter";
import { convertNepaliToEnglishNumber } from "./HelperAttendance";

const NewAttendance = () => {
  const TodayDate = new Date();
  const BSToday = dateConverter(TodayDate, "AD_BS");

  const [fromDate, setFromDate] = useState(BSToday);
  const [toDate, setToDate] = useState(BSToday);
  const [employeeId, setEmployeeId] = useState("");

  const {
    data: attendanceData,
    isLoading,
    refetch,
  } = useGetAttendance({
    employeeId,
    fromDate,
    toDate,
  });

  const handleEmployeeChange = (newValue) => {
    setEmployeeId(newValue?.employeeId);
  };

  const handleDateFromChange = (event) => {
    setFromDate(convertNepaliToEnglishNumber(event));
  };

  const handleDateToChange = (event) => {
    setToDate(convertNepaliToEnglishNumber(event));
  };

  const handleButtonClick = () => {
    refetch();
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      sortable: false,
      sorting: false,
    },
    {
      title: "Employee",
      field: "employeeName",
      emptyValue: "-",
      sorting: false,
      width: "550px",
    },
    {
      title: "Date",
      field: "attendanceList[0].dateBS",
      emptyValue: "-",
      sorting: false,
      width: "280px",
    },
    {
      title: "PunchIn",
      field: "attendanceList[0].punchTime",
      emptyValue: "-",
      sorting: false,
      width: "280px",
    },
    {
      title: "PunchOut",
      field: "PunchOut",
      emptyValue: "-",
      sorting: false,
      width: "280px",
    },
  ];

  return (
    <>
      <FilterForm
        employeeId={employeeId}
        fromDate={fromDate}
        toDate={toDate}
        handleEmployeeChange={handleEmployeeChange}
        handleDateFromChange={handleDateFromChange}
        handleDateToChange={handleDateToChange}
        handleButtonClick={handleButtonClick}
      />
      <MaterialTable
        columns={columns}
        data={attendanceData}
        title="Attendance List"
        isLoading={isLoading}
        options={{
          pagination: true,
          pageSize: 10,
          pageSizeOptions: [],
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "rgb(152, 216, 241)",
            fontWeight: "bold",
          },
        }}
        detailPanel={[
          {
            render: (rowData) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {rowData?.rowData?.attendanceList?.map(
                    (attendanceData, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            key: { index },
                            width: "100%",
                            borderBottom: "1px solid #E0E0E0",
                          }}
                        >
                          <TableRow>
                            <TableCell sx={{ width: "280px" }}>
                              {attendanceData?.dateBS}
                            </TableCell>
                            <TableCell sx={{ width: "280px" }}>
                              {attendanceData?.punchTime}
                            </TableCell>
                            <TableCell sx={{ width: "280px" }}></TableCell>
                          </TableRow>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
};

export default NewAttendance;
