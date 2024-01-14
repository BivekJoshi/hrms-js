import React, { useState } from "react";
import { Box, SwipeableDrawer, Grid, Paper, List } from "@mui/material";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Divider, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RightProjectHome } from "./component/RightProjectHome";
import { MyTask } from "./component/MyTask";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  margin: 3,
}));

export default function ProjectHomePage({
  projectWiseEmployeeData,
  employeeData,
  projectData,
}) {
  const [state, setState] = useState({ right: false });

  const getProjectName = (projectId) => {
    const project =
      projectData && projectData?.find((project) => project?.id === projectId);
    if (project) {
      return project?.projectName;
    }
    return "Project Not Found";
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <RightProjectHome />
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ maxHeight: "530px", overfloY: "auto" }}>
            <p>Teams</p>
            {projectWiseEmployeeData ? (
              projectWiseEmployeeData.slice(0, 3).map((project, index) => (
                <Item key={index}>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      maxHeight: "140px",
                      overflowY: "auto",
                    }}
                  >
                    <p>
                      Project: <b>{getProjectName(project?.projectId)}</b>
                    </p>
                    {project?.employeeIds?.map((employeeId, index) => {
                      const employee =
                        employeeData &&
                        employeeData.find((emp) => emp.id === employeeId);
                      if (employee) {
                        return (
                          <Box key={index}>
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar
                                  alt="Photo"
                                  src={employee?.employeePhotoPath}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={project?.projecctId}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {employee?.firstName}{" "}
                                      {employee?.middleName}{" "}
                                      {employee?.lastName}
                                    </Typography>
                                    <p>{employee?.position?.positionName}</p>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider
                              variant="inset"
                              component="li"
                              sx={{ margin: "0 1rem" }}
                            />
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </List>
                </Item>
              ))
            ) : (
              <p>Loading or no data available</p>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyTask />
        </Grid>
      </Grid>

      {/* <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} variant="contained">
              +
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <Box
                sx={{ width: 350, padding: 5 }}
                role="presentation"
                //   onClick={toggleDrawer(anchor, false)}
                //   onKeyDown={toggleDrawer(anchor, false)}
              >
                <ProjectTaskField />
              </Box>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div> */}
    </>
  );
}
