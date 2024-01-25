import React, { useState, useMemo, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
  Skeleton,
  Grid,
  Typography,
} from "@mui/material";
import { Table, TableBody, TableRow, TableContainer } from "@mui/material";
import { TableCell, TableHead } from "@mui/material";
import { useGetAttendance } from "../../hooks/attendance/useAttendance";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import useWindowWidth from "../../hooks/windowwidth/useWindowWidth";
import NewFilter from "../../components/NewFilter/NewFilter";

const month = [
  {
    label: "January",
    value: 1,
  },
  {
    label: "February",
    value: 2,
  },
  {
    label: "March",
    value: 3,
  },
  {
    label: "April",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "June",
    value: 6,
  },
  {
    label: "July",
    value: 7,
  },
  {
    label: "August",
    value: 8,
  },
  {
    label: "September",
    value: 9,
  },
  {
    label: "October",
    value: 10,
  },
  {
    label: "November",
    value: 11,
  },
  {
    label: "December",
    value: 12,
  },
];
const year0 = [
  {
    label: "2019",
    value: 2019,
  },
  {
    label: "2020",
    value: 2020,
  },
  {
    label: "2021",
    value: 2021,
  },
  {
    label: "2022",
    value: 2022,
  },
  {
    label: "2023",
    value: 2023,
  },
];

const Attendance = () => {
  const { data: attendanceData, isLoading } = useGetAttendance();
 
  const { mode } = useContext(ThemeModeContext);

  const date = new Date();
  const year = date.getFullYear();
  const windowWidth = useWindowWidth();

  const cMonth = date.getMonth() + 1;
  const monthName = date.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, cMonth, 0).getDate();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const { palette } = useContext(ThemeModeContext);

  const [searchEmployee, setSearchEmployee] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");


  const filteredData = useMemo(() => {
    let filtered = attendanceData || [];

    if (searchEmployee) {
      filtered = filtered.filter(
        (employee) =>
          employee.employeeName
            .toLowerCase()
            .indexOf(searchEmployee.toLowerCase()) !== -1
      );
    }

    if (searchMonth) {
      filtered = filtered.filter((employee) =>
        employee.attendanceList.some((entry) => {
          const entryDate = new Date(entry.attendanceDate);
          const entryMonth = entryDate.getMonth() + 1;
          return entryMonth === searchMonth;
        })
      );
    }

    if (searchYear) {
      filtered = filtered.filter((employee) =>
        employee.attendanceList.some((entry) => {
          const entryDate = new Date(entry.attendanceDate);
          const entryYear = entryDate.getFullYear();
          return entryYear === searchYear;
        })
      );
    }

    return filtered;
  }, [attendanceData, searchEmployee, searchMonth, searchYear]);

  function renderAttendanceCell(employee, day) {
    const currentDate = new Date();
    const isPast =
      year < currentDate.getFullYear() ||
      (year === currentDate.getFullYear() &&
        cMonth < currentDate.getMonth() + 1) ||
      (year === currentDate.getFullYear() &&
        cMonth === currentDate.getMonth() + 1 &&
        day < currentDate.getDate() + 1);

    if (isPast) {
      const attendanceEntry = employee.attendanceList.find((entry) => {
        const entryDate = new Date(entry.punchTime);
        return (
          entryDate.getFullYear() === year &&
          entryDate.getMonth() + 1 === cMonth &&
          entryDate.getDate() === day
        );
      });
      const isPresent = !!attendanceEntry;

      
      const timestamp = attendanceEntry?.punchTime;
      const dateObject = new Date(timestamp);
    
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
    
      const formattedTime = `${hours % 12}:${
        minutes < 10 ? "0" : ""
      }${minutes}${ampm}`;
    
      console.log(formattedTime);
      return (
        
        <div>
          {isPresent ? (
            <>
              <CheckIcon color="success" />
              <div>CheckIn: {formattedTime}</div>
            </>
          ) : (
            <CloseIcon color="warning" />
          )}
        </div>
      );
    } else {
      return null;
    }
  }
  if (isLoading)
    return (
      <>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
      </>
    );

  const filterMenu = [
    {
      name: "employeeName",
      label: "Search by Employee name",
      value: searchEmployee,
      type: "attendance",
      onChange: setSearchEmployee,
      md: 6,
      sm: 12,
      customClear: setSearchEmployee,
    },
  ];

  return (
    <div className="main">
      <Typography variant="h5">Attendance</Typography>
      <NewFilter inputField={filterMenu} disableSubmit={true} />

      <Typography
        variant="h6"
        style={{ marginLeft: "10px", marginTop: "16px" }}
      >
        {monthName}, {year}
      </Typography>
      <div style={{ overflowX: "auto", maxWidth: `${windowWidth - 350}px` }}>
        {" "}
        <div>
          {/* Table Container */}
          <TableContainer component={Paper}>
            {/* Table Header */}
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: palette.secondary.main }}>
                  <TableCell style={{ color: "white" }}>Sn No.</TableCell>
                  <TableCell style={{ color: "white" }}>Employees</TableCell>

                  {daysArray.map((d) => (
                    <TableCell key={d} style={{ textAlign: "center" }}>
                      <Box color="white">{d}</Box>
                      <Box color="white">
                        {new Date(
                          year,
                          cMonth - 1,
                          d
                        ).toLocaleDateString("default", { weekday: "short" })}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {filteredData.map((employee, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{employee.employeeName}</TableCell>
                    {daysArray.map((d) => (
                      <TableCell key={d} style={{ textAlign: "center" }}>
                        {renderAttendanceCell(employee, d)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
