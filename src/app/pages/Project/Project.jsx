import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Grid,
} from "@mui/material";
import "./project.css";
import { useGetProject } from "../../hooks/project/useProject";
import { AddProjectModal, } from "./ProjectModal/ProjectModal";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../../components/cards/Employee/ProjectCard";
import { PagePagination } from "../../components/Pagination/PagePagination";

const Project = () => {
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetProject();

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const projectArray = Array.isArray(projectData) ? projectData : projectData ? Object.values(projectData) : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = projectArray.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        {currentPosts.map((item, index) => (
          <ProjectCard
            item={item}
            Id={item.id}
            key={index}
            ProjectName={item.projectName}
            StartDate={item.startDate}
            EndDate={item.endDate}
            ProjectLeaderId={item.projectLeaderId}
            AssociateCompanies={item.associateCompanies[0].companyName}
            TaskStatus={item.taskStatus}
          />
        ))}
      </Grid>

      <Box padding="2rem" display="grid" justifyContent={"center"}>
        <PagePagination
          PostsPerPage={postsPerPage}
          TotalPosts={projectArray.length}
          CurrentPage={currentPage}
          Paginate={paginate}
        />
      </Box>

      {openAddModal && (
        <AddProjectModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default Project;
