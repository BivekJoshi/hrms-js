import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useGetWorkShiftAllActive } from "../../hooks/employee/AddEmployeeWorkShift/useWorkShift";
import CustomTable from "../../components/CustomTable/CustomTable";
import { WorkShiftModal } from "./WorkShiftModal/WorkShiftModal";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AssignShiftModal } from "./WorkShiftModal/AssignWorkShiftModel";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const WorkShift = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: WorkShiftAll, isLoading } = useGetWorkShiftAllActive();
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const [assignCompany, setAssignCompany] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleCloseAssignModal = () => setOpenEditModal(false);
  const { palette } = useContext(ThemeModeContext);

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: "52px",
      // sortable: false,
      sorting: false,
    },
    {
      title: "Rotation Day",
      field: "rotationDays",
      minWidth: "500px",
      sorting: false,
      emptyValue: "-",
    },
    {
      title: "Schedule Name",
      field: "scheduleName",
      width: "100px",
      sorting: false,
    },
    {
      title: "Start Week Day",
      field: "startWeekDay",
      emptyValue: "-",
      width: "50px",
      sorting: false,
    },
  ];
  const handleEditCompany = (rowData) => {
    setAssignCompany(rowData);
    setOpenEditModal(true);
  };
  const actions = [
    {
      icon: () => (
        <AssignmentIcon
          sx={{
            color: palette?.text?.primary,
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      // disabled: !permissions?.canEdit,
      tooltip: "Assign Work Schedule",
      onClick: (event, rowData) => handleEditCompany(rowData),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleAddOpenModal}
        >
          Add Work Shift
        </Button>
      </Box>
      <br />
      <CustomTable
        columns={columns}
        data={WorkShiftAll}
        title="Work Schedule"
        isLoading={isLoading}
        actions={actions}
      />

      {openAddModal && (
        <WorkShiftModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          title={"Add Todo List"}
        />
      )}

      {openEditModal && (
        <AssignShiftModal
          open={openEditModal}
          data={assignCompany}
          handleCloseModal={handleCloseAssignModal}
          title={"Add Todo List"}
        />
      )}
    </>
  );
};

export default WorkShift;
