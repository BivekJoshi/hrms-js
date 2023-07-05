import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Box, Button, Grid, Stack } from "@mui/material";
import "./project.css";
import {
  useDeleteProject,
  useGetProject,
} from "../../hooks/project/useProject";
import {
  AddProjectActiveModal,
  AddProjectModal,
  DeactivateProjectModal,
  EditProjectModal,
} from "./ProjectModal/ProjectModal";
import { useNavigate } from "react-router-dom";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import DeactivateConfirmationModal from "../../components/Modal/DeactivateConfirmationModal";

const Project = () => {
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetProject();
  const { data: employeeData } = useGetEmployee();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddActiveModal, setOpenAddActiveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeactivateModal, setOpenDeactiveModal] = useState(false);

  const [editedProject, setEditedProject] = useState({});
  const [activateProject, setActivateProject] = useState({});
  const [deactivateProject, setDeactivateProject] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleAddActiveOpenModal = () => setOpenAddActiveModal(true);
  const handleCloseAddActiveModal = () => setOpenAddActiveModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseActivateModal = () => setOpenActiveModal(false);
  const handleCloseDeactivateModal = () => setOpenDeactiveModal(false);

  const handleActivateProject = (item) => {
    setActivateProject(item);
    setOpenActiveModal(true);
  };

  const handleDeactivateProject = (item) => {
    setDeactivateProject(item);
    setOpenDeactiveModal(true);
  };

  const handleEditProject = (item) => {
    setEditedProject(item);
    setOpenEditModal(true);
  };

  const getProjectLeaderName = (projectLeaderId) => {
    return (
      employeeData?.find((employee) => employee.id == projectLeaderId)
        ?.firstName || projectLeaderId
    );
  };

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box>
        <Typography
          className="project-button"
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
          }}
        >
          On-Going Projects
          <Typography className="project-button-inner">
            <Button variant="contained" onClick={handleAddOpenModal}>
              +Add Project
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: "4px" }}
              onClick={() => {
                navigate(`get-deactivated-projects`);
              }}
            >
              In-Active Project
            </Button>
          </Typography>
        </Typography>
      </Box>
      {/* {JSON.stringify(employeeData)} */}

      <Grid
        container
        item
        gap={3}
        className="project-card-control"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {projectData.map((item, index) => (
          <Card key={index}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500], fontSize: "12px" }}
                  aria-label="recipe"
                >
                  LOGO
                </Avatar>
              }
              title={item.projectName}
              subheader={item.startDate}
              action={
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: "2px" }}
                    onClick={() => handleEditProject(item)}
                  >
                    <ModeEditOutlineIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeactivateProject(item)}
                  >
                    <DeleteIcon />
                  </Button>
                </>
              }
            />
            <CardContent
              sx={{ cursor: "pointer" }}
              className="card-content"
              onClick={() => navigate(`/admin/project/${item.id}`)}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <CardMedia
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  component="img"
                  height="150"
                  width="150"
                  image="https://images.pexels.com/photos/3775157/pexels-photo-3775157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Paella dish"
                />
                <Typography variant="p" className="card-id">
                  {item.id}
                </Typography>
                <Typography variant="p" className="card-status">
                  {item.projectStatus === "COMPLETED"
                    ? "Completed"
                    : item.projectStatus === "WORK_IN_PROGRESS"
                    ? "Work in progress"
                    : "DELAYED"}
                </Typography>
              </div>
            </CardContent>

            <CardContent
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Typography variant="body2" color="text.secondary">
                Deadline
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.endDate}
              </Typography>
            </CardContent>
            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItemButton>
                <ListItemIcon>
                  <Groups2Icon />
                </ListItemIcon>
                <ListItemText primary="Project Leader:" />
                <ListItemText
                  primary={getProjectLeaderName(item.projectLeaderId)}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Groups2Icon />
                </ListItemIcon>
                <ListItemText primary="Company Name:" />
                <ListItemText
                  primary={item.associateCompanies[0].companyName}
                />
              </ListItemButton>
            </List>
          </Card>
        ))}
      </Grid>

      {openEditModal && (
        <EditProjectModal
          id={editedProject?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}

      {openAddModal && (
        <AddProjectModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      {openDeactivateModal && (
        <DeactivateProjectModal
          id={deactivateProject?.id}
          open={openDeactivateModal}
          handleCloseModal={handleCloseDeactivateModal}
        />
      )}
    </>
  );
};

export default Project;
