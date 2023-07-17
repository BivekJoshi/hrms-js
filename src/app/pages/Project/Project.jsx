import React, { useState } from "react";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  MenuList,
  Popper,
} from "@mui/material";
import "./project.css";
import { useGetProject } from "../../hooks/project/useProject";
import {
  AddProjectModal,
  DeactivateProjectModal,
  EditProjectModal,
} from "./ProjectModal/ProjectModal";
import { useNavigate } from "react-router-dom";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useGetProjectEmployee } from "../../hooks/project/projectEmployee/useProjectEmployee";
import { FilterProject } from "../../components/Filter/Filter"

const Project = () => {
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetProject();
  const { data: employeeData } = useGetEmployee();
  const { data: projectEmployeeData } = useGetProjectEmployee();

  const [projectFilter, setProjectFilter] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeactivateModal, setOpenDeactiveModal] = useState(false);

  const [editedProject, setEditedProject] = useState({});
  const [deactivateProject, setDeactivateProject] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeactivateModal = () => setOpenDeactiveModal(false);

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

  const getEmployeeNumber = (id) => {
    const projectId = id;
    const projectEmployeeNumber = projectEmployeeData?.filter(
      (empNum) => empNum.projectId === projectId
    ).length;
    return projectEmployeeNumber || 0;
  };

  const filteredProjects = projectData && projectData?.filter((item) =>
  item?.projectName.toLowerCase().includes(projectFilter.toLowerCase())
);

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
          <Typography className="project-button-inner" sx={{display: "flex", gap: "6px"}}>
            <FilterProject data={projectData} handleProjectFilter={(value) => setProjectFilter(value)} />
            <Button variant="contained" onClick={handleAddOpenModal}>
              +Add Project
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate(`get-deactivated-projects`);
              }}
            >
              Terminated Project
            </Button>
          </Typography>
        </Typography>
      </Box>

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
        {filteredProjects.map((item, index) => (
          <Card key={index} sx={{ maxWidth: "360px" }}>
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
                    aria-describedby={id}
                    type="button"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Button>
                  <Popper open={open} anchorEl={anchorEl}>
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            handleEditProject(item);
                          }}
                          style={{ fontSize: ".8rem" }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeactivateProject(item)}
                          style={{ fontSize: ".8rem" }}
                        >
                          Terminate Project
                        </MenuItem>
                      </MenuList>
                    </Box>
                  </Popper>
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
                  {getEmployeeNumber(item.id)}
                </Typography>
                <Typography variant="p" className="card-status">
                  {item.taskStatus === "COMPLETED"
                    ? "Completed"
                    : item.taskStatus === "WORK_IN_PROGRESS"
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
