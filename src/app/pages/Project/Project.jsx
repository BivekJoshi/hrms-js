import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, Container, Grid, Stack, TextField } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetProject } from "../../hooks/project/useProject";
import { AddProjectModal } from "./ProjectModal/ProjectModal";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../../components/cards/Employee/ProjectCard";
import { PagePagination } from "../../components/Pagination/PagePagination";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import useAuth from "../../../auth/hooks/component/login/useAuth";

const Project = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee } = useAuth();
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetProject();

  const [nameFilter, setNameFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  const handleFilterIconClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);


  const projectArray = Array.isArray(projectData)
    ? projectData
    : projectData
    ? Object.values(projectData)
    : [];

  const filteredProject = projectData?.filter((project) =>
    project?.projectName.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box>
        <Typography
          className="project-button"
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
          }}
        >
          On-Going Projects
          <Box display="flex" gap={".5rem"}>
          {/* {(isSuperAdmin || isAdmin || isHr) && ( */}
            <ButtonComponent
              OnClick={() => {
                navigate(`get-deactivated-projects`);
              }}
              TextColor={"black"}
              BGColor={"white"}
              buttonName={"Terminated Project"}
            />
          {/* )} */}
           {/* {(isSuperAdmin || isAdmin || isHr) && ( */}
            <ButtonComponent
              OnClick={handleAddOpenModal}
              buttonName={"+Add Project"}
            />
           {/* )} */}
          </Box>
        </Typography>
      </Box>

      <Stack sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <FilterAltOutlinedIcon
          onClick={handleFilterIconClick}
          style={{ fontSize: "32px" }}
        />
        {isContainerVisible && (
          <Container maxWidth="100vh">
            <Card sx={{ padding: 1 }}>
              <Typography variant="h6" gutterBottom>
                Search Project
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Filter by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Filter by Company"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Card>
          </Container>
        )}
      </Stack>
      <br />
      <Grid
        container
        item
        gap={3}
        className="project-card-control"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        }}
      >
        {filteredProject.map((item, index) => (
          <>
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
          </>
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