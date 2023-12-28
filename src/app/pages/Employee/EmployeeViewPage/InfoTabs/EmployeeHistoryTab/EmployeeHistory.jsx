import React from 'react';
import { useGetPromotionHistory } from '../../../../../hooks/promotionHistory/usePromotionHistory';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useGetDesignation } from '../../../../../hooks/designation/useDesignation';
import useAuth from '../../../../../../auth/hooks/component/login/useAuth';
import { useGetLoggedInUserInfo } from '../../../../../hooks/employee/useEmployee';
import CustomTable from '../../../../../components/CustomTable/CustomTable';
import { useGetEmployeeHistory } from '../../../../../hooks/employee/useEmployeeHistory';
import { AddEmployeeHistory } from './EmployeeHistoryModal';

const EmployeeHistory = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();
  const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};
  const { id } = useParams();
  const { data: employeeHistory, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetEmployeeHistory(id)
      : useGetPromotionHistory(loggedInUserData?.id);
  // const { data: designationData, isLoading: loadingDesignation } =
  //   useGetDesignation();
  // const { data: trainingData } = useGetTrainingByEmpId(id);

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // const mappedPromotionHistory = PromotionHistory?.map((item) => {
  //   const position = designationData?.find((pos) => pos.id === item.positionId);
  //   const positionName = `${position?.positionName || '-'} (${
  //     position?.positionLevel || '-'
  //   })`;
  //   return {
  //     ...item,
  //     positionId: positionName,
  //   };
  // });
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
   <>
    <Box className='tableIcon'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '10px',
        }}
      >
        {!isEmployee ? (
          <Button
            variant='contained'
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddOpenModal}
          >
            + Add Employee History
          </Button>
        ) : (
          ''
        )}
      </Box>

      <CustomTable
        columns={columns}
        data={employeeHistory}
        title='Designation List'
        isLoading={isLoading}
      />

      {openAddModal && (
        <AddEmployeeHistory
          title={'Add Employee History'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </Box>
    </>
  );
};

export default EmployeeHistory;
