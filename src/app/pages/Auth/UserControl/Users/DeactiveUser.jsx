import React, { useState } from 'react';
import { useGetDeactivatedUser } from '../../../../hooks/employee/DeactivateEmploye/useEmployee';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import { EditActivationUserModal } from '../../../Employee/EmployeeDeactivationModal/EditDeactivationEmployeeModal';

const DeactiveUser = () => {
  const { data: deactivateUser, isLoading } = useGetDeactivatedUser();
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
      render: (rowData) => {
        const position = rowData?.role?.name;
        return position ? position : '-';
      },
      // width: 120,
      sortable: false,
      sorting: false,
    },
  ];

  const actions = [
    {
      icon: () => <RestoreFromTrashOutlinedIcon />,
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
