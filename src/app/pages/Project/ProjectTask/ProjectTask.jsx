import React, { useEffect } from "react";
import {
  useDeleteProjectTask,
  useGetProjectTaskByProjectId,
} from "../../../hooks/project/ProjectTask/useProjectTask";
import SaveIcon from "@material-ui/icons/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useState } from "react";
import { AddProjectTaskModal, AssignProjectTaskModal, EditProjectTaskModal } from "../ProjectModal/ProjectModal";
import { Box, Button, Chip, SwipeableDrawer } from "@mui/material";
import ProjectTaskField from "../../../components/Form/Project/ProjectTask/ProjectTaskFields";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import CustomTable from "../../../components/CustomTable/CustomTable";
import AssignmentIcon from '@mui/icons-material/Assignment';
import HocButton from "../../../hoc/hocButton";

const ProjectTask = ({ permissions }) => {
  const {
    data: ProjectTask,
    isLoading,
    refetch,
    isRefetching,
  } = useGetProjectTaskByProjectId();
  const [state, setState] = useState({ right: false });
  const [editedTask, setEditedTask] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletedTask, setDeletedTask] = useState({});
  const handleCloseAddModal = () => setOpenAddModal(false);
  const { data: employeeData } = useGetEmployee();

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);

  const [tableData, setTableData] = useState(ProjectTask);

  useEffect(() => {
    setTableData(ProjectTask);
  }, [isRefetching, ProjectTask]);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteTaskMutation = useDeleteProjectTask({});
  const handleDeleteTask = (rowData) => {
    setDeletedTask(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteTaskMutation.mutate(deletedTask.id);
    setOpenDeleteModal(false);
  };

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [assignData, setAssignData] = useState({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleAssignTask = (rowData) => {
    setAssignData(rowData);
    setOpenAssignModal(true);
  };

  const handleEditTask = (rowData) => {
    setEditData(rowData);
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
      title: "Name",
      field: "name",
      emptyValue: "-",
      width: "80",
    },
    {
      title: "Details",
      field: "detail",
      emptyValue: "-",
      width: "80",
    },
    {
      title: "DueDate",
      field: "dueDate",
      emptyValue: "-",
      width: "80",
    },
    {
      title: "Priority",
      field: "priority",
      emptyValue: "-",
      width: "180px",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      sorting: false,
      render: (rowData) => {
        const priority = rowData.priority;
        let chipColor = "";
        let label = "";

        if (priority === "HIGH") {
          chipColor = "red";
          label = "High";
        } else if (priority === "MEDIUM") {
          chipColor = "#b042ff";
          label = "Medium";
        } else if (priority === "LOW") {
          chipColor = "orange";
          label = "Low";
        }

        return (
          <Chip
            label={label}
            style={{
              backgroundColor: chipColor,
              color: "white",
              padding: "0px",
              width: "7rem",
            }}
          />
        );
      },
    },
    {
      title: "Status",
      field: "status",
      emptyValue: "-",
      width: "180px",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      sorting: false,
      render: (rowData) => {
        const status = rowData.status;
        let chipColor = "";
        let label = "";

        if (status === "WORK_IN_PROGRESS") {
          chipColor = "#efaf67";
          label = "WIP";
        } else if (status === "COMPLETED") {
          chipColor = "#9bedff";
          label = "Completed";
        } else if (status === "DELAYED") {
          chipColor = "#f9aeae";
          label = "Delayed";
        } else {
          chipColor = "#83f28f";
          label = "Pending";
        }

        return (
          <Chip
            label={label}
            style={{
              backgroundColor: chipColor,
              color: "#000",
              padding: "0px",
              margin: "0px",
              width: "7rem",
            }}
          />
        );
      },
    },
    {
      title: "Assign To",
      field: "projectEmployees",
      emptyValue: "-",
      width: "80",
      //   render: (rowData) => {
      //     const employeeIds = rowData.projectEmployees.map(
      //       (employee) => employee.id
      //     );
      //     return employeeIds.join(", ");
      //   },
      // },
      render: (rowData) => {
        const projectEmployees = rowData?.projectEmployees || [];
        const employeeIds = projectEmployees.map((employee) => employee.employeeId);
      
        const matchedEmployees = employeeData
          ? employeeData.filter((employee) => employeeIds.includes(employee.id))
          : [];
      
        const matchedEmployeeNames = matchedEmployees.map(
          (employee) => `${employee?.firstName} ${employee.middleName || ""} ${employee?.lastName}`
        );
      
        return matchedEmployeeNames.join(", ");
      },
    },
  ].filter(Boolean);

  const actions = [
    {
      icon: () => <AssignmentIcon />,

      disabled: !permissions?.canAdd,

      tooltip: "Assign task",
      onClick: (event, rowData) => handleAssignTask(rowData),
    },
    {
      icon: () => <ModeEditOutlineIcon />,
      disabled: !permissions?.canEdit,
      tooltip: "Edit task",
      onClick: (event, rowData) => handleEditTask(rowData),
    },
    {
      icon: () => <DeleteIcon />,
      disabled: !permissions?.canDelete,
      tooltip: "Delete task",
      onClick: (event, rowData) => handleDeleteTask(rowData),
    },
    // {
    //   icon: () => (
    //     <HocButton
    //       permissions={permissions.canAdd}
    //       icon={<AssignmentIcon />}
    //     />
    //   ),
    //   tooltip: "Assign task",
    //   onClick: (event, rowData) => handleAssignTask(rowData),
    // },
    // {
    //   icon: () => (
    //     <HocButton permissions={permissions.canEdit} icon={<ModeEditOutlineIcon />} />
    //   ),
    //   tooltip: "Edit task",
    //   onClick: (event, rowData) => handleEditTask(rowData),
    // },
    // {
    //   icon: () => (
    //     <HocButton permissions={permissions.canDelete} icon={<DeleteIcon />} />
    //   ),
    //   tooltip: "Delete task",
    //   onClick: (event, rowData) => handleDeleteTask(rowData),
    // },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HocButton
          permissions={permissions}
          color={"white"}
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"+ Add Task"}
        />
      </Box>
      <br></br>

      <CustomTable
        columns={columns}
        data={tableData}
        title="Project Task"
        isLoading={isLoading}
        actions={actions}
      />

      {openAddModal && (
        <AddProjectTaskModal
          title={"Add Task"}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openAssignModal && (
        <AssignProjectTaskModal
          title={"Edit Task"}
          id={assignData?.id}
          data={assignData}
          open={openAssignModal}
          handleCloseModal={() => setOpenAssignModal(false)}
        />
      )}
       {openEditModal && (
        <EditProjectTaskModal
          title={"Edit Task"}
          id={assignData?.id}
          data={editData}
          open={openEditModal}
          handleCloseModal={() => setOpenEditModal(false)}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Task"}
        />
      )}

    
    </>
  );
};

export default ProjectTask;
