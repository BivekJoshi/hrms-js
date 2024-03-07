import React, { useState } from "react";
import { useGetAttendance } from "../../../../../hooks/attendance/useAttendance";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import { getNepaliMonthName } from "../../../../Attendance/HelperAttendance";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AttendenceInfo = () => {
  const { id: employeeId } = useParams();
  const fromDate = "2076-01-01";
  const toDate = "2080-10-01";

  const { data, isLoading } = useGetAttendance({
    employeeId,
    fromDate,
    toDate,
  });

  const [expandedState, setExpandedState] = useState({});

  const handleExpansion = (year, month) => {
    const identifier = `${year}-${month}`;
    setExpandedState((prevState) => ({
      ...prevState,
      [identifier]: !prevState[identifier],
    }));
  };

  const separateDataByYearAndMonth = (attendanceList) => {
    const separatedData = {};
    attendanceList?.forEach((attendance) => {
      const date = new Date(attendance.dateBS);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      if (!separatedData[year]) {
        separatedData[year] = {};
      }
      if (!separatedData[year][month]) {
        separatedData[year][month] = [];
      }
      separatedData[year][month].push(attendance);
    });
    return separatedData;
  };

  const columns = [
    {
      title: "Date",
      field: "dateBS",
      emptyValue: "-",
      width: "80px",
      sorting: false,
    },
    {
      title: "Day",
      field: "",
      emptyValue: "-",
      width: "80px",
      sorting: false,
    },
    {
      title: "Check In",
      field: "punchTime",
      emptyValue: "-",
      width: "80px",
      sorting: false,
    },
    {
      title: "Check Out",
      field: "punchout",
      emptyValue: "-",
      width: "80px",
      sorting: false,
    },
    {
      title: "Branch",
      field: "punchout",
      emptyValue: "-",
      width: "80px",
      sorting: false,
    },
  ];

  const separatedData = separateDataByYearAndMonth(
    data?.[0]?.attendanceList || []
  );

  return (
    <div>
      {Object.entries(separatedData)
        .reverse()
        .map(([year, monthData]) => (
          <>
            <h4>Year: {year}</h4>
            <Box key={year} mb={4}>
              {Object.entries(monthData)
                .reverse()
                .map(([month, attendanceList]) => {
                  const identifier = `${year}-${month}`;
                  return (
                    <Accordion
                      key={identifier}
                      expanded={expandedState[identifier] || false}
                      onChange={() => handleExpansion(year, month)}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{`Month: ${getNepaliMonthName(
                          month
                        )}, ${year}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box mb={2}>
                          {/* <h3>{`Month: ${getNepaliMonthName(month)}`}</h3> */}
                          <CustomTable
                            key={`${year}-${month}`}
                            columns={columns}
                            data={attendanceList}
                            title={`Attendance Data - ${year}, ${getNepaliMonthName(
                              month
                            )}`}
                            isLoading={isLoading}
                            pageSize={30}
                            options={false}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
            </Box>
          </>
        ))}
    </div>
  );
};

export default AttendenceInfo;
