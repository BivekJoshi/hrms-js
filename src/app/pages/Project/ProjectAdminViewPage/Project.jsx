import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetProject, useGetProjectPageWise } from "../../../hooks/project/useProject";
import { AddProjectModal } from "../ProjectModal/ProjectModal";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../../../components/cards/Employee/ProjectCard";
import HocButton from "../../../hoc/hocButton";
import PermissionHoc from "../../../hoc/permissionHoc";

const Project = ({ permissions }) => {
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetProject();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = 12;
  const{data:projectDataCount}=useGetProjectPageWise(pageNumber);

  const pageSize = projectDataCount?.pageSize || 5;
  const totalPages = projectDataCount?.totalPages || 0;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [nameFilter, setNameFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

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
            <HocButton
              permissions={permissions}
              color={"primary"}
              variant={"outlined"}
              onClick={() => {
                navigate(`get-deactivated-projects`);
              }}
              buttonName={"Terminated Project"}
            />
            <HocButton
              permissions={permissions}
              color={"primary"}
              variant={"contained"}
              onClick={handleAddOpenModal}
              buttonName={"+Add Project"}
            />
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
        {filteredProject.slice(startIndex, endIndex).map((item, index) => (
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
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          boundaryCount={3}
          size="large"
          color="primary"
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

export default PermissionHoc(Project);
