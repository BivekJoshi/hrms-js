import {
    Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function createData(SN, Task, Assignby, Priority) {
  return { SN, Task, Assignby, Priority };
}

const rows = [
  createData(1, "Button", "Dhiraj Joshi", "High"),
  createData(2, "Button", "Dhiraj Joshi", "High"),
  createData(3, "Button", "Dhiraj Joshi", "High"),
  createData(4, "Button", "Dhiraj Joshi", "High"),
  createData(5, "Button", "Dhiraj Joshi", "High"),
];

export const PendingTask = (props) => {
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell align="right">Task</TableCell>
            <TableCell align="right">Assignby</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.SN}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.SN}
              </TableCell>
              <TableCell align="right">{row.Task}</TableCell>
              <TableCell align="right">{row.Assignby}</TableCell>
              <TableCell align="right">{row.Priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
