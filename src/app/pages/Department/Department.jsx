import * as React from 'react';
import { useGetDepartment } from '../../hooks/department/useDepartment';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal, Typography } from '@mui/material';
import DepartmentForm from '../../components/Form/Department/DepartmentForm';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Department = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: departmentData, isLoading } = useGetDepartment();
  if (isLoading) return <>Loading</>;
  return (
    <>
      <div>
        <Button onClick={handleOpen}>+Add Department</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <DepartmentForm onClose={handleClose}/>
          </Box>
        </Modal>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Department Name</StyledTableCell>
              <StyledTableCell align="left">Department Type</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentData.map((row) => (
              <StyledTableRow key={row.departmentName}>
                <StyledTableCell component="th" scope="row">
                  {row.departmentName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.departmentType}</StyledTableCell>
                <StyledTableCell align="left">{row.departmentDescription}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Department