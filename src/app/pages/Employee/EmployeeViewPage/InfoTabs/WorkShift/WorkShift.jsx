import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import { useGetWorkShiftById } from "../../../../../hooks/employee/AddEmployeeWorkShift/useWorkShift";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useContext } from "react";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import { useParams } from "react-router-dom";
import { UpdateStartDate } from "../../../../WorkShift/WorkShiftModal/UpdateStartDate";

const WorkShift = ({ employeeId }) => {
  const { id } = useParams();
  const { data: WorkShiftAll, isLoading } = useGetWorkShiftById(
    id || employeeId
  );
  const { palette } = useContext(ThemeModeContext);
  const [updateStartDate, setUpdateStartDate] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleCloseAddModal = () => setOpenEditModal(false);
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: "52px",
      sorting: false,
    },
    {
      title: "Schedule Name",
      field: "scheduleName",
      width: "100px",
      sorting: false,
    },
    {
      title: "Start Date",
      field: "startDate",
      emptyValue: "-",
      width: "50px",
      sorting: false,
    },
    {
      title: "End Date",
      field: "endDate",
      emptyValue: "-",
      width: "50px",
      sorting: false,
    },
  ];
  const handleUpdateStartDate = (rowData) => {
    setUpdateStartDate(rowData);
    setOpenEditModal(true);
  };
  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: palette?.text?.primary,
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      // disabled: palette?.text?.primary,
      tooltip: "Edit Start Date",
      onClick: (event, rowData) => handleUpdateStartDate(rowData),
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={WorkShiftAll}
        title="Work Schedule"
        isLoading={isLoading}
        actions={actions}
      />

      {openEditModal && (
        <UpdateStartDate
          open={openEditModal}
          data={updateStartDate}
          handleCloseModal={handleCloseAddModal}
          title={"Add Todo List"}
        />
      )}
    </>
  );
};

export default WorkShift;
