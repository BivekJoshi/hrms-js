import React, { useContext, useState } from "react";
import { useGetDeactivatedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetAllLeaveType } from '../../../hooks/leaveType/useLeaveType';
import CustomTable from '../../CustomTable/CustomTable';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import AddTaskIcon from "@mui/icons-material/AddTask";
import { ActivatedLeaveTypeModal, DeactivatedLeaveTypeModal } from './DeactivatedLeaveTypeModal';

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

const DeactivatedLeaveTypeFields = ({ closeModal, title, permissions }) => {
    const { mode } = useContext(ThemeModeContext);
  const { data: allLeaveTypeData, isLoading } = useGetAllLeaveType();
  const [openModal, setopenModal] = useState(false);
  const [activateOfficeResource, setActivateOfficeResource] = useState({});
  const handleCloseActivatedModal = () => setopenModal(false);

  const handleActivate = (rowData) => {
    setActivateOfficeResource(rowData);
    setopenModal(true);
  };
console.log("allLeaveTypeData", allLeaveTypeData)
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
    // {
    //   title: "Description",
    //   field: "leaveDescription",
    //   width: "15%",
    //   sortable: false,
    //   sorting: false,
    //   emptyValue: "-",
    //   render: (rowData) => (
    //     <div
    //       style={{
    //         whiteSpace: "normal",
    //         overflowWrap: "break-word",
    //         wordWrap: "break-word",
    //         wordBreak: "break-all",
    //       }}
    //     >
    //       {rowData?.leaveDescription}
    //     </div>
    //   ),
    // },
    {
      id: "actions",
      label: "Actions",
      title: "Action",
      render: (rowData) => (
        <Tooltip title="Activate Leave Type">
          <IconButton onClick={() => handleActivate(rowData)}>
            <AddTaskIcon
              sx={{
                color: "black",
                "&:hover": {
                  color: "green",
                },
              }}
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={allLeaveTypeData}
        title={title}
        isLoading={isLoading}
        emptyRowsWhenPaging={true}
        // sorting={true}
        height={"320px"}
        fileName="Inactive office resource"
        exportButton
        exportExcel
        pdfNone
      />

      {openModal && (
        <ActivatedLeaveTypeModal
          title={"Activate Leave Type"}
          data={activateOfficeResource}
          open={openModal}
          handleCloseModal={handleCloseActivatedModal}
        />
      )}
    </>
  );
};

export default DeactivatedLeaveTypeFields;
