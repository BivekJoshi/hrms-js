import {
  Button,
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFammilyById } from '../../../../hooks/employee/useFamily';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import FamilyAddFields from './FamilyAddFields';
import useAddFamilyDetails from './useAddFamilyDetails';
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
const NewEmployeeFamilyDetailForm = () => {
  const { id } = useParams();
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data, isLoading } = useGetFammilyById(id);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const { formik } = useAddFamilyDetails(handleCloseAddModal);
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'relation', label: 'Relation', minWidth: 150 },
    {
      id: 'mobileNumber',
      label: 'Mobile Number',
      minWidth: 150,
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 50,
      align: 'right',
    },
  ];

  return (
    <div>
      <Typography variant='h6' textAlign='center'>
        Family Details
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          Add
        </Button>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column?.id === 'actions') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '12px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <ModeEditOutlineIcon
                                  sx={{
                                    color: 'black',
                                    '&:hover': {
                                      color: 'green',
                                    },
                                  }}
                                />
                                <DeleteIcon
                                  sx={{
                                    color: 'black',
                                    '&:hover': {
                                      color: 'red',
                                    },
                                  }}
                                />
                              </div>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {openAddModal && (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={openAddModal}
          onClose={handleCloseAddModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openAddModal}>
            <Box sx={style}>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
              >
                Text in a modal
              </Typography>
              <FamilyAddFields formik={formik} onClose={handleCloseAddModal} />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default NewEmployeeFamilyDetailForm;
