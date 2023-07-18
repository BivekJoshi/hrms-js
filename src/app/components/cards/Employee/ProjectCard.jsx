import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Button, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { ClickAwayListener, Grow, Stack } from "@mui/material";
import { MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import MainCard from "../MainCard";
import { DeactivateProjectModal, EditProjectModal } from "../../../pages/Project/ProjectModal/ProjectModal";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetProjectEmployee } from "../../../hooks/project/projectEmployee/useProjectEmployee";


const ProjectCard = ({
    Id,
    ProjectName,
    StartDate,
    EndDate,
    ProjectLeaderId,
    AssociateCompanies,
    TaskStatus,
    item
}) => {
    const navigate = useNavigate();
    const { data: employeeData } = useGetEmployee();
    const { data: projectEmployeeData } = useGetProjectEmployee();

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
        const projectLeader = employeeData?.find((employee) => employee.id == projectLeaderId);
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
            <Box maxWidth="350px">
                <MainCard
                    grow={true}
                    style={{
                        textAlign: "center",
                        padding: ".2rem",
                    }}
                >

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center"  }} >
                            <Avatar sx={{ bgcolor: "red" }} style={{width:'30px',height:'30px'}}>
                                {ProjectName.charAt(0)}
                            </Avatar>
                            {/* <Typography style={{ fontWeight: 600, margin: "1rem 0", fontSize: "20px",marginLeft:".1rem" }}>
                                {ProjectName}
                            </Typography> */}
                        </Grid>
                        <Grid item >
                            <Box display="flex" justifyContent={"end"}>
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
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
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
                    <Box onClick={() => navigate(`/admin/project/${Id}`)}>
                        <Stack>
                            <Typography style={{ fontWeight: 700, margin: "1rem 0", fontSize: "20px" }}>
                                {ProjectName}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                Team Size: {getEmployeeNumber(Id)}
                            </Typography>
                        </Stack>
                        <CardContent
                            sx={{ display: "flex", justifyContent: "space-around" }}
                        >
                            <div style={{ borderRight: "1px solid gray", paddingRight: "25px" }}>
                                <Typography variant="body2" color="text.secondary">
                                    Start Date
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {StartDate}
                                </Typography>
                            </div>
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
                                    <Chip label={TaskStatus === "COMPLETED"
                                        ? "Completed"
                                        : TaskStatus === "WORK_IN_PROGRESS"
                                            ? "Work in progress"
                                            : "DELAYED"} style={{
                                                width: 230,
                                                backgroundColor: TaskStatus === "COMPLETED"
                                                    ? "green"
                                                    : TaskStatus === "WORK_IN_PROGRESS"
                                                        ? "orange"
                                                        : "red",
                                                color: "#fff" // You can customize the text color if needed
                                            }} />
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack
                            style={{
                                fontSize: ".9rem",
                            }}
                        >
                            <Box backgroundColor="#f5f5f5" padding=".5rem" borderRadius=".5rem">
                                <Stack
                                    spacing={{ xs: 1 }}
                                    direction="row"
                                    useFlexGap
                                    flexWrap="wrap"
                                    alignItems="center"
                                >
                                    {/* <Email /> */}
                                    <Typography variant="p" style={{ margin: "10px 0" }}>Project Leader: {getProjectLeaderName(ProjectLeaderId)}</Typography>
                                </Stack>

                                <Stack
                                    spacing={{ xs: 1 }}
                                    direction="row"
                                    useFlexGap
                                    flexWrap="wrap"
                                    alignItems="center"
                                >
                                    {/* <LocalPhone /> */}
                                    <Typography variant="p" style={{ margin: "10px 0" }}>Associate Companies {AssociateCompanies}</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </MainCard>
            </Box >
            {openEditModal && (
                <EditProjectModal
                    id={editedProject?.id}
                    open={openEditModal}
                    handleCloseModal={handleCloseEditModal}
                />
            )
            }
            {
                openDeactivateModal && (
                    <DeactivateProjectModal
                        id={deactivateProject?.id}
                        open={openDeactivateModal}
                        handleCloseModal={handleCloseDeactivateModal}
                    />
                )
            }
        </>
    );
};

export default ProjectCard;