import MaterialTable from "@material-table/core";
import React, {useState} from "react";
import { useAddActivateProject, useGetDeactivatedProject } from "../../../hooks/project/useProject";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetProjectEmployeeById } from "../../../hooks/project/projectEmployee/useProjectEmployee";
import { Box, Button, Grid, Stack } from "@mui/material";
import ActiveConfirmationModal from '../../../components/Modal/ActivateConfirmationModal';

const DeactivatedProject = () => {
  const { data: deactivatedProject, isLoading } = useGetDeactivatedProject();
  const { data: employeeData } = useGetEmployee();

  const [activeProject, setActiveProject] = useState({});
	const [openActiveModal, setOpenActiveModal] = useState(false);
    const handleCloseActiveModal = () => setOpenActiveModal(false);


  const getLeaderName = (rowData) => {
    const projectId = rowData.projectLeaderId;
    const employee = employeeData?.find((emp) => emp.id === projectId);
    const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
    return name;
  };

  const ActiveProjectEmployeeMutation = useAddActivateProject({});
  const handleActiveProject = (rowData) => {
    setActiveProject(rowData);
    setOpenActiveModal(true);
  };

  const handleConfirmActive = () => {
    ActiveProjectEmployeeMutation.mutate(activeProject.id);
    setOpenActiveModal(false);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 120,
      sortable: false,
    },
    {
      title: "Project Name",
      field: "projectName",
      emptyValue: "-",
      width: 120,
    },
    {
      title: "Project Leader Name",
      render: (rowData) => {
        return <p>{getLeaderName(rowData)}</p>;
      },
      width: 120,
    },
    {
      title: "Action",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button variant="contained" color="primary" onClick={() => handleActiveProject(rowData)}>
            Activate Project
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 120,
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <MaterialTable
        columns={columns}
        data={deactivatedProject}
        title="In Active Projects"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
            color: "#FFF",
            fontSize: 20,
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          },
        }}
      />

      {openActiveModal && (
        <ActiveConfirmationModal
          open={openActiveModal}
          handleCloseModal={handleCloseActiveModal}
          handleConfirmActive={handleConfirmActive}
          message={"Activate"}
        />
      )}
    </>
  );
};

export default DeactivatedProject;