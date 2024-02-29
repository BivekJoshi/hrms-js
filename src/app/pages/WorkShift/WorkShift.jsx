import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetWorkShiftAllActive } from "../../hooks/employee/AddEmployeeWorkShift/useWorkShift";
import CustomTable from "../../components/CustomTable/CustomTable";
import { WorkShiftModal } from "./WorkShiftModal/WorkShiftModal";

const WorkShift = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: WorkShiftAll, isLoading } = useGetWorkShiftAllActive();
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

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
      title: "Shift Name",
      field: "shiftName",
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
        title="Work Shift"
        isLoading={isLoading}
        // actions={actions}
      />

{openAddModal && (
        <WorkShiftModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          title={"Add Todo List"}
        />
      )}
    </>
  );
};

export default WorkShift;
