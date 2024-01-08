import React, { useState } from 'react';
import CustomTable from '../../../components/CustomTable/CustomTable';
import {
  EditActivationEmployeeModal,
  EditDeactivationEmployeeModal,
} from '../EmployeeDeactivationModal/EditDeactivationEmployeeModal';
import { useGetDeactivatedEmployee } from '../../../hooks/employee/DeactivateEmploye/useEmployee';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const DeactivatedEmployee = () => {
  const { data: deactivateEmployee, isLoading } = useGetDeactivatedEmployee();

  const [openDeactivatedModal, setOpenDeactivatedModal] = useState(false);
  const [deactivatedEmployee, setDeactivatedEmployee] = useState({});
  const handleCloseDeactivatedModal = () => setOpenDeactivatedModal(false);

  const handleDeactivatedEmployee = (rowData) => {
    setDeactivatedEmployee(rowData);
    setOpenDeactivatedModal(true);
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
      title: 'Name',
      render: (rowData) => {
        const name = `${rowData?.firstName} ${rowData?.lastName}`;
        return name || '-';
      },
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Email',
      field: 'officeEmail',
      emptyValue: '-',
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Phone Number',
      field: 'mobileNumber',
      emptyValue: '-',
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Position',
      render: (rowData) => {
        const position = rowData?.position?.positionName;
        return position ? position : '-';
      },
      // width: 120,
      sortable: false,
      sorting: false,
    },
  ];

  const actions = [
    {
      icon: () => <PersonAddAltSharpIcon style={{color: 'green'}} />,
      tooltip: 'Activate Employee',
      onClick: (event, rowData) => handleDeactivatedEmployee(rowData),
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <CustomTable
        columns={columns}
        data={deactivateEmployee}
        title='Inactive Employee'
        isLoading={isLoading}
        actions={actions}
        singleAction={true}
      />
      {openDeactivatedModal && (
        <EditActivationEmployeeModal
          title={'Activate Employee'}
          data={deactivatedEmployee}
          open={openDeactivatedModal}
          handleCloseModal={handleCloseDeactivatedModal}
        />
      )}
    </>
  );
};

export default DeactivatedEmployee;
