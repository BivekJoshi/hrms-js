import React, { useState } from 'react';
import { useGetEventAttenderList } from '../../../hooks/event/useEvent';
import PermissionHoc from '../../../hoc/permissionHoc';
import HocButton from '../../../hoc/hocButton';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CustomTable from '../../../components/CustomTable/CustomTable';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { EditEventAttendanceModal } from '../EventModal/EventModal';

const EventAttendance = ({ permissions }) => {
  const { data: eventAttendanceData, isLoading } = useGetEventAttenderList();
  // const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedEventAttendance, setEditedEventAttendance] = useState({});
  // const [deletedDepartment, setDeletedDepartment] = useState({});

  // const handleAddOpenModal = () => setOpenAddModal(true);
  // const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  // const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  // // const deleteDepartmentMutation = useDeleteDepartment({});
  // const handleDeleteDepartment = (rowData) => {
  //   setDeletedDepartment(rowData);
  //   setOpenDeleteModal(true);
  // };

  // const handleConfirmDelete = () => {
  //   // deleteDepartmentMutation.mutate(deletedDepartment.id);
  //   setOpenDeleteModal(false);
  // };

  const handleEditEventAttendance = (rowData) => {
    setEditedEventAttendance(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Employee Name",
      field: "userName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Contact",
      field: "mobileNumber",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Event Name",
      field: "eventName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Date",
      field: "eventDate",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Time",
      field: "eventTime",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Location",
      field: "eventLocation",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Description",
      field: "eventDescription",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Status",
      field: "isPresent",
      render: (rowData) => {
        if(rowData?.isPresent){
          return (<div><DoneSharpIcon style={{color: 'green'}} /></div>)
        } else return (<div><CloseSharpIcon style={{color: 'red'}} /></div>)
      },
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
  ].filter(Boolean);

  const actions = [
    {
      icon: () => (
        <HocButton
          permissions={permissions.canEdit}
          icon={<ModeEditOutlineIcon />}
        />
      ),
      tooltip: "Edit Event",
      onClick: (event, rowData) => handleEditEventAttendance(rowData),
    },
    // {
    //   icon: () => (
    //     <HocButton permissions={permissions.canDelete} icon={<DeleteIcon />} />
    //   ),
    //   tooltip: "Delete Department",
    //   onClick: (event, rowData) => handleDeleteDepartment(rowData),
    // },
  ];


  return !isLoading && (
    <>
       <CustomTable
        columns={columns}
        data={eventAttendanceData?.events}
        title="Event Attendance Data"
        isLoading={isLoading}
        actions={actions}
      />
        {openEditModal && (
        <EditEventAttendanceModal
          title={"Edit Event Attendance"}
          // id={editedDepartment?.id}
          data={editedEventAttendance}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(EventAttendance);
