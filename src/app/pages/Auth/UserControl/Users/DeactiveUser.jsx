import React, { useState } from 'react';
import { useGetDeactivatedUser } from '../../../../hooks/employee/DeactivateEmploye/useEmployee';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import { EditActivationUserModal } from '../../../Employee/EmployeeDeactivationModal/EditDeactivationEmployeeModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const roleType = [
  {
    name: 'ROLE_SUPER_ADMIN',
    label: 'Super Admin',
    id: 1,
  },
  {
    name: 'ROLE_ADMIN',
    label: 'Admin',
    id: 2,
  },
  {
    name: 'ROLE_MANAGER',
    label: 'Manager',
    id: 3,
  },
  {
    name: 'ROLE_HR_ADMIN',
    label: 'HR Admin',
    id: 1,
  },
  {
    name: 'ROLE_HR_CLERK',
    label: 'HR Clerk',
    id: 1,
  },
  {
    name: 'ROLE_EMPLOYEE',
    label: 'Employee',
    id: 1,
  },
];

const DeactiveUser = () => {
  const { data: deactivateUser, isLoading } = useGetDeactivatedUser();
  const [openDeactivatedModal, setOpenDeactivatedModal] = useState(false);
  const [deactivatedEmployee, setDeactivatedEmployee] = useState({});

  const handleCloseDeactivatedModal = () => setOpenDeactivatedModal(false);

  const handleDeactivatedEmployee = (rowData) => {
    setDeactivatedEmployee(rowData);
    setOpenDeactivatedModal(true);
  };

  const getRoleLabel = (roleName) => {
    const role = roleType?.find((role) => role?.name === roleName);
    return role ? role?.label : '-';
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
      field: 'name',
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Email',
      field: 'email',
      emptyValue: '-',
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Phone Number',
      field: 'mobileNo',
      emptyValue: '-',
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Role',
      render: (rowData) => getRoleLabel(rowData?.role?.name),
      // width: 120,
      sortable: false,
      sorting: false,
    },
  ];

  const actions = [
    {
      icon: () => <AddCircleIcon style={{color: 'green'}} />,
      tooltip: 'Activate Employee',
      onClick: (event, rowData) => handleDeactivatedEmployee(rowData),
    },
  ];

  if (isLoading) return <>Loading</>;
  return (
    <div>
      <CustomTable
        columns={columns}
        data={deactivateUser}
        title='Inactive Users'
        isLoading={isLoading}
        actions={actions}
        singleAction={true}
      />
      {openDeactivatedModal && (
        <EditActivationUserModal
          id={deactivatedEmployee?.id}
          open={openDeactivatedModal}
          handleCloseModal={handleCloseDeactivatedModal}
        />
      )}
    </div>
  );
};

export default DeactiveUser;
