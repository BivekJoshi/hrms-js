import { Box, Button } from '@mui/material';
import React from 'react';
import CustomTable from '../../../../../components/CustomTable/CustomTable';
import { useParams } from 'react-router-dom';
import { useGetEmployeeEmployment } from '../../../../../hooks/employee/useEmployeeHistory';

const EmploymentDetails = ({ data, role }) => {
  const { id } = useParams();
  const { data: employeeHistory, isLoading } = useGetEmployeeEmployment(id);
  console.log(
    '🚀 ~ file: EmploymentDetails.jsx:10 ~ EmploymentDetails ~ employeeHistory:',
    employeeHistory
  );

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
      title: 'Branch Name',
      field: 'employerName',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'Branch Address',
      field: 'employerAddress',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'Position Hold',
      field: 'pastPosition',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'From Date',
      field: 'fromDate',
      emptyValue: '-',
      width: 200,
    },
    {
      title: 'To Date',
      field: 'toDate',
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
      title: 'description',
      field: 'description',
      emptyValue: '-',
      width: 50,
    },
  ];
  return (
    <Box className='tableIcon'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '10px',
        }}
      >
        {role ? (
          <Button
            variant='contained'
            sx={{ mt: 3, ml: 1 }}
            // onClick={handleAddOpenModal}
          >
            + Add Employment Details
          </Button>
        ) : (
          ''
        )}
      </Box>

      <CustomTable
        columns={columns}
        data={employeeHistory}
        title='Employment Details'
        isLoading={isLoading}
      />

      {/* {openAddModal && (
        <AddEmployeeHistory
          title={'+ Add Employment Details'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )} */}
    </Box>
  );
};

export default EmploymentDetails;
