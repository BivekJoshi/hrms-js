import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDeleteEmployeeResource } from '../../../hooks/resource/employeeResource/useEmployeeResource';
import { useGetEmployeeResource } from '../../../hooks/resource/employeeResource/useEmployeeResource';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteConfirmationModal from '../../../components/Modal/DeleteConfirmationModal';
import { AddEmployeeResourceModal } from './EmployeeResourceModal';
import { EditEmployeeResourceModal } from './EmployeeResourceModal';
import PermissionHoc from '../../../hoc/permissionHoc';
import HocButton from '../../../hoc/hocButton';
import CustomTable from '../../../components/CustomTable/CustomTable';

const EmployeeResource = ({ permissions }) => {
  const { data: employeeResourceData, isLoading } = useGetEmployeeResource();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deletedData, setDeletedData] = useState({});
  const [editedEmployeeResouce, setEditedEmployeeResource] = useState({});
  // console.log(employeeResourceData,"editedEmployeeResouce");
  // console.log('employeeResourceData?.returnDate:', employeeResourceData?.returnDate);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteRowDataMutation = useDeleteEmployeeResource({});
  const handleDeleteRowData = (rowData) => {
    setDeletedData(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteRowDataMutation.mutate(deletedData.id);
    setOpenDeleteModal(false);
  };

  const actionsCellStyle = {
    padding: '0 2rem',
  };
  const handleEditRowData = (rowData) => {
    setEditedEmployeeResource(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      width: '3%',
      maxWidth: '40px',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Employee Name',
      field: 'employeeName',

      render: (rowData) => {
        const name =
          rowData?.employee?.firstName +
          ' ' +
          rowData?.employee?.middleName +
          ' ' +
          rowData?.employee?.lastName;
        return name ? name : '-';
      },
      // emptyValue: '-',
      // render: (rowData) => {
      //   return <p>{getEmployeeName(rowData)} </p>;
      // },
      // customFilterAndSearch: (searchValue, rowData) => {
      //   const employeeName = getEmployeeName(rowData);
      //   return employeeName.toLowerCase().includes(searchValue.toLowerCase());
      // },
      sorting: false,
    },
    {
      title: 'Resource',
      field: 'officeResourceName',
      render: (rowData) => {
        const resource = rowData?.officeResource?.name;
        // const name = rowData?.employee?.firstName + " " + rowData?.employee?.middleName + " " +  rowData?.employee?.lastName
        return resource ? resource : '-';
      },
      // emptyValue: '-',
      // render: (rowData) => {
      //   return <p>{getResourceName(rowData)}</p>;
      // },
      // customFilterAndSearch: (searchValue, rowData) => {
      //   const resourceName = getResourceName(rowData);
      //   return resourceName.toLowerCase().includes(searchValue.toLowerCase());
      // },
      sorting: false,
    },
    {
      title: 'Received Date',
      field: 'receiveDate',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Device Condition Before',
      field: 'conditionWhileProvided',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Returned Date',
      field: 'returnDate',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Device Condition After',
      field: 'conditionWhileReturned',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Remarks',
      field: 'remarks',
      emptyValue: '-',
      sorting: false,
    },
    {
      id: 'actions',
      label: 'Actions',
      title: 'Action',
      render: (rowData) => {
        return (
          <>
            <Button disabled={rowData?.returnDate !== null}>
              <ModeEditOutlineIcon
                onClick={(event) => handleEditRowData(rowData)}
                sx={{
                  color:
                    rowData?.returnDate === null
                      ? 'rgb(188, 188, 188)'
                      : 'black',
                  '&:hover': { color: 'green' },
                }}
              />
            </Button>
            <Button disabled={rowData?.returnDate !== null}>
              <DeleteIcon
                onClick={(event) => handleDeleteRowData(rowData)}
                sx={{
                  color:
                    rowData?.returnDate === null
                      ? 'rgb(188, 188, 188)'
                      : 'black',
                  '&:hover': { color: 'green' },
                }}
              />
            </Button>
          </>
        );
      },
    },
  ];
  // const actions = [
  //   {
  //     icon: () => (
  //       <Button disabled={!permissions?.canEdit && editedEmployeeResouce?.returnDate === null}>
  //         <ModeEditOutlineIcon
  //           sx={{
  //             color: "black",
  //             "&:hover": {
  //               color: "green",
  //             },
  //           }}
  //         />
  //       </Button>
  //     ),

  //     tooltip: "Edit Logistics",
  //     onClick: (event, rowData) => handleEditRowData(rowData),
  //   },
  //   {
  //     icon: (rowData) => (
  //       <DeleteIcon
  //         sx={{
  //           color: "black",
  //           "&:hover": {
  //             color: "red",
  //           },
  //         }}
  //       />
  //     ),
  //     disabled:
  //       !permissions?.canDelete || employeeResourceData?.returnDate === null,
  //     tooltip: "Remove Logistics",
  //     onClick: (event, rowData) => handleDeleteRowData(rowData),
  //   },
  // ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          padding: '.5rem 0',
        }}
      >
        <HocButton
          permissions={permissions}
          color={'white'}
          variant={'contained'}
          onClick={handleAddOpenModal}
          buttonName={'+ Provide Logistics'}
        />
      </Box>

      <CustomTable
        columns={columns}
        data={employeeResourceData}
        title='Employee Logistics'
        isLoading={isLoading}
        // actions={actions}
        // exportButton={true}
      />
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Employee with Resource'}
        />
      )}
      {openAddModal && (
        <AddEmployeeResourceModal
          title={'Provide Logistics'}
          id={editedEmployeeResouce?.id}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditEmployeeResourceModal
          title={'Edit Logistics'}
          data={editedEmployeeResouce}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(EmployeeResource);
