import React, { useEffect } from "react";
import {
  useDeleteProjectTask,
  useGetProjectTaskByProjectId,
} from "../../../hooks/project/ProjectTask/useProjectTask";
import SaveIcon from "@material-ui/icons/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useState } from "react";
import { EditProjectTaskModal } from "../ProjectModal/ProjectModal";
import { Box, Button, Chip, SwipeableDrawer } from "@mui/material";
import ProjectTaskField from "../../../components/Form/Project/ProjectTask/ProjectTaskFields";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import CustomTable from "../../../components/CustomTable/CustomTable";

const ProjectTask = () => {
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
  const { data: employeeData } = useGetEmployee();

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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRowData, setEditedRowData] = useState({});

  const handleEditRowData = (rowData) => {
    setEditedRowData(rowData);
    setOpenEditModal(true);
  };

  const handleAssignTask = (rowData) => {
    setState({ ...state, right: true });
    setEditedTask(rowData);
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
        const employeeIds = rowData.projectEmployees.map(
          (employee) => employee.empId
        );
        const matchedEmployees = employeeData && employeeData.filter((employee) =>
          employeeIds.includes(employee.id)
        );
        const matchedEmployeeNames = matchedEmployees.map(
          (employee) =>
            `${employee.firstName} ${employee.middleName} ${employee.lastName}`
        );
        return matchedEmployeeNames.join(", ");
      },
    },
  ];

  return (
    <>
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} variant="contained">
              Add Task
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <Box
                sx={{ width: 350, padding: 5 }}
                role="presentation"
                //   onClick={toggleDrawer(anchor, false)}
                //   onKeyDown={toggleDrawer(anchor, false)}
              >
                <ProjectTaskField
                  data={editedTask}
                  onClose={() => setState({ right: false })}
                />
              </Box>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
      <br />
      <CustomTable
        columns={columns}
        data={tableData}
        title="Project Task"
        isLoading={isLoading}
        actions={[
          {
            icon: () => <ModeEditOutlineIcon sx={{ color: "#01579b" }} />,
            tooltip: "Edit Project TaskDetails",
            onClick: (event, rowData) => handleEditRowData(rowData),
          },
          {
            icon: () => <SaveIcon sx={{ color: "#01579b" }} />,
            tooltip: "Save User",
            onClick: (event, rowData) => handleAssignTask(rowData),
          },
          {
            icon: () => <DeleteIcon sx={{ color: "#01579b" }} />,
            tooltip: "Delete Task",
            onClick: (event, rowData) => handleDeleteTask(rowData),
          },
        ]}
      />
      {openEditModal && (
        <EditProjectTaskModal
          id={editedRowData?.id}
          data={editedRowData}
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
