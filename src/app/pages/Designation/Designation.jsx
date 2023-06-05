import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetDesignation } from '../../hooks/useDesignation';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'blue',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Designation = () => {
  const { data: designationData, isLoading } = useGetDesignation();
  if (isLoading) return <>Loading</>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Position Name</StyledTableCell>
            <StyledTableCell align="left">Position Level</StyledTableCell>
            <StyledTableCell align="left">Salary</StyledTableCell>
            <StyledTableCell align="left">Details</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {designationData.map((row) => (
            <StyledTableRow key={row.positionName}>
              <StyledTableCell component="th" scope="row">
                {row.positionName}
              </StyledTableCell>
              <StyledTableCell align="left">{row.positionLevel}</StyledTableCell>
              <StyledTableCell align="left">{row.salary}</StyledTableCell>
              <StyledTableCell align="left">{row.positionDetails}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Designation