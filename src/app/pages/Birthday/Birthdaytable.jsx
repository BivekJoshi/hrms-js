import React from "react";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const Age = (dateOfBirth) => {
  const year = new Date(dateOfBirth).getFullYear();
  const cyear = new Date().getFullYear();
  const age = cyear - year;
  return age;
};
const Birthdaytable = ({ data }) => {
  console.log(data);
  const today = new Date();

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>

                <TableCell>Age</TableCell>

                <TableCell>Date</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                const currentYear = new Date().getFullYear();
                let empBday = row.dateOfBirth.split("-");
                const bdayThisYear =
                  currentYear + "-" + empBday[1] + "-" + empBday[2];
                const dateOfBirth = new Date(row.dateOfBirth);
                const isTodayBirthday =
                  dateOfBirth.getMonth() === today.getMonth() &&
                  dateOfBirth.getDate() === today.getDate();
                const age = Age(row.dateOfBirth);
                return (
                  <TableRow
                    key={index}
                    className={isTodayBirthday ? "Highlight" : "green"}
                  >
                    <TableCell>
                      {row.firstName} {row.middleName} {row.lastName}
                    </TableCell>
                    <TableCell>{data?.gender}</TableCell>

                    <TableCell>{age}</TableCell>
                    <TableCell>
                      {format(new Date(row.dateOfBirth), " MMMM ", {
                        locale: enUS,
                      })}
                    </TableCell>

                    <TableCell>
                      {format(new Date(bdayThisYear), "EEEE", {
                        locale: enUS,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Birthdaytable;
