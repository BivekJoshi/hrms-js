import React, { useState, useMemo, useContext } from "react";
import { TextField, Button, Box, MenuItem, Paper } from "@mui/material";
import { Table, TableBody, TableRow, TableContainer } from "@mui/material";
import { TableCell, TableHead } from "@mui/material";
import { useGetAttendance } from "../../hooks/attendance/useAttendance";
import "./Attendance.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import ThemeModeContext from "../../../theme/ThemeModeContext";

let cMonth;

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
  const{mode}= useContext(ThemeModeContext)

  const date = new Date();
  const year = date.getFullYear();

  const [cMonth, setCMonth] = useState(date.getMonth() + 1);
  date.setMonth(cMonth - 1);

  const monthName = date.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, cMonth, 0).getDate();

  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  function Next() {
    setCMonth(cMonth + 1);
  }

  function Previous() {
    setCMonth(cMonth - 1);
  }

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

  return (
    <div className="main">
      <h2>Attendance</h2>

      <div className="Search">
        <Box
          style={{ display: "flex", justifyContent: "space-around" }}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="on"
        >
          <TextField
            id="standard-basic"
            label="Search Employee"
            variant="outlined"
            value={searchEmployee}
            onChange={(e) => setSearchEmployee(e.target.value)}
          />

          <TextField
            select
            label="Select Month"
            defaultValue={monthName}
            value={searchMonth}
            onChange={(e) => setSearchMonth(e.target.value)}
          >
            {month.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select Year"
            defaultValue={year}
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
          >
            {year0.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ bgcolor: mode === "light" ? "" : "" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>

      <h4 style={{ marginLeft: "10px" }}>
        {monthName}, {year}
      </h4>

      <div className="table-wrapper">
        <TableContainer className="cntnr" component={Paper}>
          <Table aria-label="simple table" className="table">
            <TableHead className="heading">
              <TableRow>
                <TableCell className="sn">Sn No.</TableCell>

                {daysArray.map((d, i) => {
                  const dayName = new Date(year, cMonth - 1, d).toLocaleString(
                    "default",
                    { weekday: "short" }
                  );

                  return (
                    <>
                      {" "}
                      {i === 0 && (
                        <TableCell
                          style={{
                            width: "140px",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                          className="emp"
                        >
                          Employee
                        </TableCell>
                      )}
                      <TableCell style={{ textAlign: "center" }} key={d}>
                        <Box color="white">{d}</Box>
                        <Box color="white">{dayName}</Box>
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
            </TableHead>

            {filteredData.length > 0 ? (
              <TableBody>
                {filteredData.map((employee, i) => {
                  const serialNumber = i + 1;
                  return (
                    <TableRow className="trhighlight" key={i}>
                      <TableCell className="snNo">{serialNumber}</TableCell>
                      <TableCell className="empname">
                        {employee.employeeName}
                      </TableCell>
                      {daysArray.map((d) => {
                        const currentDate = new Date();

                        const isPast =
                          year < currentDate.getFullYear() ||
                          (year === currentDate.getFullYear() &&
                            cMonth < currentDate.getMonth() + 1) ||
                          (year === currentDate.getFullYear() &&
                            cMonth === currentDate.getMonth() + 1 &&
                            d < currentDate.getDate() + 1);

                        if (isPast) {
                          const attendanceEntry = employee.attendanceList.find(
                            (entry) => {
                              const entryDate = new Date(entry.attendanceDate);
                              const entryYear = entryDate.getFullYear();
                              const entryMonth = entryDate.getMonth() + 1;
                              const entryDay = entryDate.getDate();
                              return (
                                entryYear === year &&
                                entryMonth === cMonth &&
                                entryDay === d
                              );
                            }
                          );
                          const isPresent = !!attendanceEntry;
                          return (
                            <TableCell style={{ textAlign: "center" }} key={d}>
                              {isPresent ? (
                                <>
                                  <div>
                                    <CheckIcon color="success" />
                                  </div>
                                  <div>{attendanceEntry.timeIn}</div>
                                </>
                              ) : (
                                <CloseIcon color="warning" />
                              )}
                            </TableCell>
                          );
                          {
                          }
                        } else {
                          return <TableCell key={d}></TableCell>;
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={daysArray.length + 2}>
                    No matching records found.
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
      <div className="button" style={{ maxWidth: "1480px" }}>
        <ButtonComponent
          OnClick={Previous}
          buttonName={"Previous"}
          BGColor="white"
          TextColor="black"
          disabled={false}
        />
        <ButtonComponent OnClick={Next} buttonName={"Next"} BGColor />
      </div>
    </div>
  );
};

export default Attendance;
