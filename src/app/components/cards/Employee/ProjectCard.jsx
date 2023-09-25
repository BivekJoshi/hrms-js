import React, { useState, useEffect, useRef, useContext } from "react";
import { Avatar, Box, Button, CardContent } from "@mui/material";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import { ClickAwayListener, Grow, Stack } from "@mui/material";
import { MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import MainCard from "../MainCard";
import {
  DeactivateProjectModal,
  EditProjectModal,
} from "../../../pages/Project/ProjectModal/ProjectModal";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetProjectEmployee } from "../../../hooks/project/projectEmployee/useProjectEmployee";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import useAuth from "../../../../auth/hooks/component/login/useAuth";

const ProjectCard = ({
  Id,
  ProjectName,
  StartDate,
  EndDate,
  ProjectLeaderId,
  AssociateCompanies,
  TaskStatus,
  item,
}) => {
  const navigate = useNavigate();
  const { isEmployee } = useAuth();
  const { data: employeeData } = useGetEmployee();
  const { data: projectEmployeeData } = useGetProjectEmployee();
  const { mode } = useContext(ThemeModeContext);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeactivateModal, setOpenDeactiveModal] = useState(false);

  const [editedProject, setEditedProject] = useState({});
  const [deactivateProject, setDeactivateProject] = useState({});

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeactivateModal = () => setOpenDeactiveModal(false);

  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleDeactivateProject = (item) => {
    setDeactivateProject(item);
    setOpenDeactiveModal(true);
  };

  const handleEditProject = (item) => {
    setEditedProject(item);
    setOpenEditModal(true);
  };

  const getProjectLeaderName = (projectLeaderId) => {
    const projectLeader = employeeData?.find(
      (employee) => employee.id == projectLeaderId
    );
    if (projectLeader) {
      const { firstName, middleName, lastName } = projectLeader;
      return `${firstName} ${middleName} ${lastName}`;
    }
    return projectLeaderId;
  };

  const getEmployeeNumber = (id) => {
    const projectId = id;
    const projectEmployeeNumber = projectEmployeeData?.filter(
      (empNum) => empNum.projectId === projectId
    ).length;
    return projectEmployeeNumber || 0;
  };

  return (
    <>
        <MainCard
          grow={true}
          style={{
            textAlign: "center",
            padding: "1.5rem",
            backgroundColor: mode === "light" ? "white" : "#292929",
            overflow: "auto",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ bgcolor: "red" }}
                style={{ width: "30px", height: "30px" }}
              >
                {ProjectName.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item>
              <Box display="flex" justifyContent={"end"}>
                {!isEmployee ? (
                  <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <MoreHorizIcon />
                  </Button>
                ) : null}

                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  // sx={{ left: "-3rem !important" }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                            style={{ fontSize: ".8rem" }}
                          >
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
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            </Grid>
          </Grid>
          <Box
            onClick={
              !isEmployee ? () => navigate(`/admin/project/${Id}`) : undefined
            }
          >
            <Stack>
              <Typography
                style={{ fontWeight: 700, margin: "1rem 0", fontSize: "20px" }}
              >
                <Chip
                  sx={{
                    bgcolor: mode === "light" ? "white" : "rgb(41, 41, 41)",
                    fontSize: "1rem",
                    width: "80%",
                  }}
                  label={
                    <h3
                      style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {ProjectName}
                    </h3>
                  }
                />
              </Typography>
              <Typography variant="body2" color="text.primary">
                Team Size: {getEmployeeNumber(Id)}
              </Typography>
            </Stack>
            <CardContent
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <Typography variant="body2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {StartDate}
                </Typography>
              </div>
              <Divider sx={{ borderWidth: 1, borderColor: "#7d7b7b" }} />
              <div>
                <Typography variant="body2" color="text.secondary">
                  Deadline
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {EndDate}
                </Typography>
              </div>
            </CardContent>

            <Stack>
              <Box padding={"0 1rem"}>
                <Typography variant="body2" gutterBottom>
                  <Chip
                    label={
                      TaskStatus === "COMPLETED"
                        ? "Completed"
                        : TaskStatus === "WORK_IN_PROGRESS"
                        ? "Work in progress"
                        : TaskStatus === "PENDING"
                        ? "Pending"
                        : "Delayed"
                    }
                    style={{
                      width: 230,
                      backgroundColor:
                        TaskStatus === "COMPLETED"
                          ? "green"
                          : TaskStatus === "WORK_IN_PROGRESS"
                          ? "orange"
                          : TaskStatus === "PENDING"
                          ? "blue"
                          : "red",
                      color: "#fff",
                    }}
                  />
                </Typography>
              </Box>
            </Stack>

            <Stack style={{ fontSize: ".9rem" }}>
              <Box
                backgroundColor={mode === "light" ? "#f5f5f5" : "#4d4c4c"}
                padding=".5rem"
                borderRadius=".5rem"
              >
                <Stack
                  spacing={{ xs: 1 }}
                  useFlexGap
                  flexWrap="wrap"
                  alignItems="center"
                >
                  <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
                    Project Leader
                  </Typography>
                  <Typography variant="p">
                    {getProjectLeaderName(ProjectLeaderId)}
                  </Typography>
                  <Typography variant="p" style={{ margin: "10px 0" }}>
                    <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Associate Companies
                    </Typography>
                    {AssociateCompanies}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </MainCard>
      {openEditModal && (
        <EditProjectModal
          id={editedProject?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
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

export default ProjectCard;
