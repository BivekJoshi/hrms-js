import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CustomTable from '../../../../../components/CustomTable/CustomTable';
import { useParams } from 'react-router-dom';
import { useGetEmployeeEmployment } from '../../../../../hooks/employee/useEmployeeHistory';
import { AddEmploymentHistory } from './AddEmploymentHistory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmploymentTransfer from './EmploymentTransfer';

const EmploymentDetails = ({ data }) => {
  const { id } = useParams();
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const { data: employeeHistory, isLoading } = useGetEmployeeEmployment(id);

  const [actionDD, setActionDD] = React.useState('Actions');

  const handleChange = (event) => {
    setActionDD(event.target.value);
  };
  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      width: '3%',
      maxWidth: '50px',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Department Name',
      field: 'department.departmentName',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'Branch Name',
      field: 'branch.branchName',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'Position Hold',
      field: 'position.positionName',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'From Date',
      field: 'effectiveDateFrom',
      emptyValue: '-',
      width: 200,
    },
    {
      title: 'To Date',
      field: 'effectiveDateTo',
      emptyValue: '-',
      width: 200,
    },
    {
      title: 'Remarks',
      field: 'remarks',
      emptyValue: '-',
      width: 200,
    },
    {
      title: 'Active',
      field: 'isActive',
      render: (rowData) => {
        return (
          <Typography textAlign='center'>
            {rowData?.isActive ? (
              <CheckCircleIcon sx={{ color: 'green' }} />
            ) : (
              <CancelIcon sx={{ color: 'red' }} />
            )}
          </Typography>
        );
      },
      emptyValue: '-',
      width: 50,
    },
  ];
  return (
    <Box className='tableIcon'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '12px',
        }}
      >
        <FormControl sx={{ mt: 3, minWidth: 150 }} size='small'>
          <InputLabel id='demo-select-small-label'>Actions</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={actionDD}
            label='Age'
            onChange={handleChange}
          >
            <MenuItem value='Actions'>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Transfer'}>Transfer</MenuItem>
            <MenuItem value={'Up/Downgrade'}>Up/Downgrade</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          onClick={handleAddOpenModal}
        >
          Add Employment Details
        </Button>
      </Box>
      {actionDD === 'Actions' && (
        <CustomTable
          columns={columns}
          data={employeeHistory}
          title='Employment Details'
          isLoading={isLoading}
        />
      )}

      {actionDD === 'Transfer' && employeeHistory?.length > 0 && (
        <EmploymentTransfer data={employeeHistory} />
      )}

      {openAddModal && (
        <AddEmploymentHistory
          title={'Add Employment Details'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </Box>
  );
};

export default EmploymentDetails;
