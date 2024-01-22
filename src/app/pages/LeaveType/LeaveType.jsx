import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Stack, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import {
  useDeactivateLeaveType,
  useDeleteLeaveType,
  useGetLeaveType,
} from "../../hooks/leaveType/useLeaveType";
import {
  AddLeaveTypeModal,
  EditLeaveTypeModal,
  GetDeactivatedLeaveTypeModal,
} from "./LeaveTypeModal/LeaveTypeModal";
import PermissionHoc from "../../hoc/permissionHoc";
import HocButton from "../../hoc/hocButton";
import CustomTable from "../../components/CustomTable/CustomTable";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { DeactivatedLeaveTypeModal } from "../../components/Form/LeaveType/DeactivatedLeaveTypeModal";
import NewFilter from "../../components/NewFilter/NewFilter";

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
  {
    id: 10,
    leaveName: "ANNUAL",
    leaveLabel: "Annual Leave",
  },
];

const LeaveType = ({ permissions }) => {
  const { data: leaveTypeData, isLoading } = useGetLeaveType();

  const [existingLeaveTypes, setExistingLeaveTypes] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedLeaveType, setEditedLeaveType] = useState({});
  const [deletedLeaveType, setDeletedLeaveType] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleOpenDeactivateModal = () => setOpenDeactivateModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseDeactivateModal = () => setOpenDeactivateModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteLeaveTypeMutation = useDeactivateLeaveType({});
  const handleDeleteLeaveType = (rowData) => {
    setDeletedLeaveType(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveTypeMutation.mutate(deletedLeaveType);
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
    {
      id: "actions",
      label: "Actions",
      title: "Action",
      render: (rowData) => {
        return (
          <div style={{ display: "flex" }}>
            <Tooltip title="Edit leave type" placement="bottom">
              <Button disabled={!permissions?.canEdit}>
                <ModeEditOutlineIcon
                  sx={{
                    color: mode === "light" ? "black" : "white",
                    "&:hover": {
                      color: "green",
                    },
                  }}
                  onClick={(event) => handleEditLeaveType(rowData)}
                />
              </Button>
            </Tooltip>
            <Tooltip title="deactivate leave type" placement="bottom">
              <Button disabled={!rowData?.deletable || !permissions?.canDelete}>
                <DeleteIcon
                  sx={{
                    color:
                      rowData?.deletable === false
                        ? "rgb(188, 188, 188)"
                        : "black",
                    "&:hover": { color: "red" },
                  }}
                  onClick={(event) => handleDeleteLeaveType(rowData)}
                />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const { mode } = React.useContext(ThemeModeContext);

  // const actions = [
  //   {
  //     icon: () => (
  //       <ModeEditOutlineIcon
  //         sx={{
  //           color: mode === "light" ? "black" : "white",
  //           "&:hover": {
  //             color: "green",
  //           },
  //         }}
  //       />
  //     ),
  //     disabled: !permissions?.canEdit,
  //     tooltip: "Edit Detail",
  //     onClick: (event, rowData) => handleEditLeaveType(rowData),
  //   },
  //   {
  //     icon: () => (
  //       <DeleteIcon
  //         sx={{
  //           color: mode === "light" ? "black" : "white",
  //           "&:hover": {
  //             color: "red",
  //           },
  //         }}
  //       />
  //     ),
  //     disabled: !permissions?.canDelete,
  //     tooltip: "Delete",
  //     onClick: (event, rowData) => handleDeleteLeaveType(rowData),
  //   },
  // ];

  const filteredLeaveNames = existingLeaveTypes
    ? leaveName.filter(
        (option) => !existingLeaveTypes.includes(option?.leaveName)
      )
    : [];
  const remainingLeaves = filteredLeaveNames && filteredLeaveNames?.length;

  if (isLoading) return <>Loading</>;

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "1rem",
          gap: "0.6rem",
        }}
      >
        <HocButton
          permissions={permissions}
          variant="outlined"
          onClick={handleOpenDeactivateModal}
          buttonName={"Deactivated Leave Type"}
        />
        {remainingLeaves === 0 ? (
          <Button variant={"contained"} disabled>
            Max Leave Type Reached
          </Button>
        ) : (
          <HocButton
            permissions={permissions}
            variant={"contained"}
            onClick={handleAddOpenModal}
            buttonName={"Add Leave Type"}
          />
        )}

        {/* <HocButton
          permissions={permissions}
          color="white"
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"Add Leave Type"}
        /> */}
      </Box>
      <CustomTable
        columns={columns}
        data={leaveTypeData}
        title="Leave Type"
        isLoading={isLoading}
        // actions={actions}
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
        <DeactivatedLeaveTypeModal
          title={"Deactivate Leave Type"}
          open={openDeleteModal}
          data={deletedLeaveType}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Leave Type"}
        />
      )}

      {openDeactivateModal && (
        <GetDeactivatedLeaveTypeModal
          open={openDeactivateModal}
          title={"Deactivated Leave Type"}
          handleCloseModal={handleCloseDeactivateModal}
          data={deletedLeaveType}
          existingLeaveTypes={existingLeaveTypes}
          permissions={permissions}
        />
      )}
    </Grid>
  );
};

export default PermissionHoc(LeaveType);
