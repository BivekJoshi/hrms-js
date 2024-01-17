import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { useGetDeactivatedProject } from "../../../hooks/project/useProject";
import { IconButton, Grid, Typography } from "@mui/material";
import { AddProjectActiveModal } from "../ProjectModal/ProjectModal";
import CloseIcon from "@mui/icons-material/Close";
import Restore from "../../../../assets/restore.png";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const DeactivatedProject = ({ onClick }) => {
  const { data: deactivatedProject, isLoading } = useGetDeactivatedProject();
  const [openActivateModal, setOpenActivateModal] = useState(false);
  const [activateProject, setActivateProject] = useState({});
  const handleCloseActivateModal = () => setOpenActivateModal(false);

  const handleActivateProject = (rowData) => {
    setActivateProject(rowData);
    setOpenActivateModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      maxWidth: "1px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Project Name",
      field: "projectName",
      emptyValue: "-",
      width: 200,
    },
  ];
  const { mode } = React.useContext(ThemeModeContext);

  const actions = [
    {
      icon: () => (
        <img
          src={Restore}
          alt="Restore"
          style={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "green",
            },
            width: "1.5rem",
          }}
        />
      ),
      tooltip: "Activate Project",
      onClick: (event, rowData) => handleActivateProject(rowData),
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <div>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.2rem 0.6rem",
          }}
        >
          <Typography variant="h6"> Terminated project</Typography>

          <IconButton onClick={onClick}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </div>
      <br />
      <MaterialTable
        columns={columns}
        data={deactivatedProject}
        title="Inactive Projects"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          actionsCellStyle: {
            display: "flex",
            justifyContent: "stretch",
            alignItems: "center",
            padding:"0 20px"
          },
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#1c7ed6",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: ".8rem",
          },
          maxBodyHeight: "35vh",
        }}
        localization={{
          header: {
            actions: "Action",
          },
        }}
        actions={actions}
      />

      {openActivateModal && (
        <AddProjectActiveModal
          title={"Activate Project"}
          id={activateProject?.id}
          open={openActivateModal}
          handleCloseModal={handleCloseActivateModal}
        />
      )}
    </>
  );
};

export default DeactivatedProject;
