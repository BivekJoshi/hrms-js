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
import { useGetProject } from "../../hooks/project/useProject";
import { AddProjectModal, EditProjectModal } from "./ProjectModal/ProjectModal";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetProject();

  const [editedProject, setEditedProject] = useState({});

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleEditProject = (rowData) => {
    setEditedProject(rowData);
    setOpenEditModal(true);
  };

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
          }}
        >
          On-Going Projects
          <Button variant="contained" onClick={handleAddOpenModal}>
            +Add Project
          </Button>
        </Typography>
      </Box>

      <Grid
        container
        item
        gap={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                <Button variant="contained" sx={{ marginLeft: "12px" }} onClick={() => handleEditProject}>
                  Edit
                </Button>
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
                <ListItemText primary={item.projectLeaderId} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Groups2Icon />
                </ListItemIcon>
                <ListItemText primary="Company Name:" />
                <ListItemText primary={item.associateCompanies[0].companyName} />
              </ListItemButton>
            </List>
          </Card>
        ))}
        
      </Grid>
      {openAddModal && (
        <AddProjectModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      {openEditModal && (
        <EditProjectModal
          id={editedProject?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default Project;
