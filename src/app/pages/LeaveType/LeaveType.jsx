import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import {
  useDeleteLeaveType,
  useGetLeaveType,
} from "../../hooks/leaveType/useLeaveType";
import {
  AddLeaveTypeModal,
  EditLeaveTypeModal,
} from "./LeaveTypeModal/LeaveTypeModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import PermissionHoc from "../../hoc/permissionHoc";
import HocButton from "../../hoc/hocButton";
import useAuth from "../../../auth/hooks/component/login/useAuth";
import CustomTable from "../../components/CustomTable/CustomTable";

const leaveName = [
  {
    id: 1,
    leaveName: "PATERNITY",
    leaveLabel: "Paternity Leave",
  },
  {
    id: 2,
    leaveName: "MATERNITY",
    leaveLabel: "Maternity Leave",
  },
  {
    id: 3,
    leaveName: "SICK",
    leaveLabel: "Sick Leave",
  },
  {
    id: 4,
    leaveName: "UNPAID",
    leaveLabel: "Unpaid Leave",
  },
  {
    id: 5,
    leaveName: "MATERNITY_ADDITIONAL",
    leaveLabel: "Maternity Additional Leave",
  },
  {
    id: 6,
    leaveName: "CASUAL",
    leaveLabel: "Casual Leave",
  },
  {
    id: 7,
    leaveName: "BEREAVEMENT",
    leaveLabel: "Bereavent Leave",
  },
  {
    id: 8,
    leaveName: "MARRIAGE",
    leaveLabel: "Marriage Leave",
  },
  {
    id: 9,
    leaveName: "FESTIVAL",
    leaveLabel: "Festival Leave",
  },
];
const LeaveType = ({ permissions }) => {
  const { data: leaveTypeData, isLoading } = useGetLeaveType();
  const { isSuperAdmin, isEmployee } = useAuth();

  const [existingLeaveTypes, setExistingLeaveTypes] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedLeaveType, setEditedLeaveType] = useState({});
  const [deletedLeaveType, setDeletedLeaveType] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteLeaveTypeMutation = useDeleteLeaveType({});
  const handleDeleteLeaveType = (rowData) => {
    setDeletedLeaveType(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveTypeMutation.mutate(deletedLeaveType.id);
    setOpenDeleteModal(false);
  };

  const handleEditLeaveType = (rowData) => {
    setEditedLeaveType(rowData);
    setOpenEditModal(true);
  };

  useEffect(() => {
    if (leaveTypeData) {
      const leaveNames = leaveTypeData.map((leaveType) => leaveType.leaveName);
      setExistingLeaveTypes(leaveNames);
    }
  }, [leaveTypeData]);

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "1%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Leave Name",
      field: "leaveName",
      width: "5%",
      render: (rowData) => {
        const leaveNameLabel =
          leaveName.find((leave) => leave?.leaveName === rowData?.leaveName)
            ?.leaveLabel || rowData?.leaveName;
        return <div>{leaveNameLabel}</div>;
      },
      sortable: false,
      sorting: false,
    },
    // {
    //   title: 'Leave Name',
    //   field: 'leaveName',
    //   render: (rowData) => {
    //     const formattedLeaveName =
    //       rowData.leaveName.charAt(0).toUpperCase() +
    //       rowData.leaveName.slice(1).toLowerCase();
    //     return `${formattedLeaveName} Leave`;
    //   },
    //   width: '10%',
    //   sortable: false,
    //   sorting: false,
    // },
    {
      title: "Leave Days",
      field: "leaveTotal",
      emptyValue: "-",
      // width: 15,
      sortable: false,
      sorting: false,
    },
    {
      title: "Carry Forward",
      field: "isCarryForward",
      emptyValue: "-",
      // width: 10,
      render: (rowData) => (rowData.isCarryForward ? "Yes" : "No"),
      sortable: false,
      sorting: false,
    },
    {
      title: "Description",
      field: "leaveDescription",
      width: "15%",
      sortable: false,
      sorting: false,
      emptyValue: "-",
      render: (rowData) => (
        <div
          style={{
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          {rowData?.leaveDescription}
        </div>
      ),
    },
  ];

  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: "black",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      disabled: !permissions?.canEdit,
      tooltip: "Edit Detail",
      onClick: (event, rowData) => handleEditLeaveType(rowData),
    },
    {
      icon: () => (
        <DeleteIcon
          sx={{
            color: "black",
            "&:hover": {
              color: "red",
            },
          }}
        />
      ),
      disabled: !permissions?.canDelete,
      tooltip: "Delete",
      onClick: (event, rowData) => handleDeleteLeaveType(rowData),
    },
  ];
  if (isLoading) return <>Loading</>;
  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "1rem",
        }}
      >
        <HocButton
          permissions={permissions}
          color="white"
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"+ Add Leave Type"}
        />
      </Box>
      <CustomTable
        columns={columns}
        data={leaveTypeData}
        title="Leave Type"
        isLoading={isLoading}
        actions={actions}
      />
      {openEditModal && (
        <EditLeaveTypeModal
          title={"Edit Leave Type"}
          data={editedLeaveType}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddLeaveTypeModal
          open={openAddModal}
          title={"Add Leave Type"}
          handleCloseModal={handleCloseAddModal}
          existingLeaveTypes={existingLeaveTypes}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Leave Type"}
        />
      )}
    </Grid>
  );
};

export default PermissionHoc(LeaveType);
