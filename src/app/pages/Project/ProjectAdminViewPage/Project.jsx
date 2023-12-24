import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  useGetProject,
  useGetProjectDetail,
  useGetProjectPageWise,
} from "../../../hooks/project/useProject";
import { AddProjectModal } from "../ProjectModal/ProjectModal";

import ProjectCard from "../../../components/cards/Employee/ProjectCard";
import HocButton from "../../../hoc/hocButton";
import PermissionHoc from "../../../hoc/permissionHoc";
import useAuth from "../../../../auth/hooks/component/login/useAuth";
import DeactivatedProject from "../DeactivatedProject/DeactivatedProject";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";

const Project = ({ permissions }) => {
  const [pageNumber, setpageNumber] = useState(0);
  const { isEmployee } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const { data: projectDetail, isLoading } = useGetProjectPageWise(pageNumber, 5);

  const [nameFilter, setNameFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleFilterIconClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (isLoading) return <>Loading</>;

  const handlePageChange = (event, newPage) => {
    setpageNumber(newPage - 1);
  };

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
          {isEmployee ? null : (
            <Box display="flex">
              <ButtonComponent
                BGColor="white"
                TextColor="#000"
                OnClick={handleOpenModal}
                buttonName={"Terminated Project"}
              />
              <ButtonComponent
                color="white"
                OnClick={handleAddOpenModal}
                buttonName="+ Add Project"
              />
            </Box>
          )}
        </Typography>
      </Box>

      {/* <Stack sx={{ display: "flex", flexDirection: "row-reverse" }}>
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
                <Grid item xs={12}>
                  <TextField
                    label="Filter by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Card>
          </Container>
        )}
      </Stack> */}
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
        {
          projectDetail?.projectResList?.map((item, index) => (
            <ProjectCard
              item={item}
              Id={item?.id}
              key={index}
              ProjectName={item.projectName}
              StartDate={item.startDate}
              EndDate={item.endDate}
              ProjectLeaderId={item.projectLeadName}
              TaskStatus={item.taskStatus}
              totalEmployee={item.totalEmployee}
            />
          ))}
      </Grid>

      <Box padding="2rem" display="grid" justifyContent={"center"}>
        <Pagination
          count={projectDetail?.totalPages}
          onChange={handlePageChange}
          boundaryCount={3}
          size="large"
          color="primary"
        />
      </Box>

      {openAddModal && (
        <AddProjectModal
          title={"Add Project"}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DeactivatedProject />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              onClick={() => setOpenModal(false)}
              color="error"
              variant="contained"
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default PermissionHoc(Project);
