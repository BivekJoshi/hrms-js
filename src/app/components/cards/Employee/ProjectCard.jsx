import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popper,
    Typography
} from '@mui/material';
import { red } from "@mui/material/colors";
import React, { useState } from 'react'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Groups2Icon from "@mui/icons-material/Groups2";
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useGetProjectEmployee } from '../../../hooks/project/projectEmployee/useProjectEmployee';
import { DeactivateProjectModal, EditProjectModal } from '../../../pages/Project/ProjectModal/ProjectModal';
import { useNavigate } from 'react-router-dom';

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

    const handleDeactivateProject = (item) => {
        setDeactivateProject(item);
        setOpenDeactiveModal(true);
    };

    const handleEditProject = (item) => {
        setEditedProject(item);
        setOpenEditModal(true);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <>
            <Card sx={{ maxWidth: "360px" }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: red[500], fontSize: "12px" }}
                            aria-label="recipe"
                        >
                            LOGO
                        </Avatar>
                    }
                    title={ProjectName}
                    subheader={StartDate}
                    action={
                        <>
                            <Button
                                aria-describedby={id}
                                type="button"
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Popper id={id} open={open} anchorEl={anchorEl}>
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
                    onClick={() => navigate(`/admin/project/${Id}`)}
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
                            {getEmployeeNumber(Id)}
                        </Typography>
                        <Typography variant="p" className="card-status">
                            {TaskStatus === "COMPLETED"
                                ? "Completed"
                                : TaskStatus === "WORK_IN_PROGRESS"
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
                        {EndDate}
                    </Typography>
                </CardContent>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton>
                        <ListItemIcon>
                            <Groups2Icon />
                        </ListItemIcon>
                        <ListItemText primary="Project Leader:" />
                        <ListItemText
                            primary={getProjectLeaderName(ProjectLeaderId)}
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Groups2Icon />
                        </ListItemIcon>
                        <ListItemText primary="Company Name:" />
                        <ListItemText
                            primary={AssociateCompanies}
                        />
                    </ListItemButton>
                </List>
            </Card>


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
    )
}

export default ProjectCard