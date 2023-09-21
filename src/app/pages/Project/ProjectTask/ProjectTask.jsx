import React from "react";
import MaterialTable from "@material-table/core";
import { useGetProjectTaskByProjectId } from "../../../hooks/project/ProjectTask/useProjectTask";
import tableIcons from "../../../../theme/overrides/TableIcon";
import SaveIcon from "@material-ui/icons/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useState } from "react";
import { EditProjectTaskModal } from "../ProjectModal/ProjectModal";

const ProjectTask = () => {
  const { data: ProjectTask, isLoading } = useGetProjectTaskByProjectId();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRowData, setEditedRowData] = useState({});
  // console.log(editedRowData,"edited Row Data");

  const handleEditRowData = (rowData) => {
    setEditedRowData(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
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
      width: "80",
    },
    {
      title: "Status",
      field: "status",
      emptyValue: "-",
      width: "80",
    },
    {
      title: "Assign To",
      field: "projectEmployees",
      emptyValue: "-",
      width: "80",
      render: (rowData) => {
        const employeeIds = rowData.projectEmployees.map(
          (employee) => employee.id
        );
        return employeeIds.join(", ");
      },
    },
  ];

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={ProjectTask}
        title="Project Task"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
            textAlign: "center",
            border: "2px solid #fff",
            minHeight: "10px",
            textTransform: "capitilize",
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
        actions={[
          {
            icon: () => <ModeEditOutlineIcon />,
            tooltip: "Edit Project TaskDetails",
            onClick: (event,rowData) => handleEditRowData(rowData),
          },
          {
            icon: () => <SaveIcon />,
            tooltip: "Save User",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
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
    </>
  );
};

export default ProjectTask;
