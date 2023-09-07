import React, { useState } from "react";
import {
  Box,
  SwipeableDrawer,
  Button,
  Grid,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import ProjectTaskField from "../../../components/Form/Project/ProjectTask/ProjectTaskFields";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  margin: 3,
}));

export default function ProjectHomePage() {
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const progress = 5 * 100;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div>
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  variant="contained"
                >
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
          </div>

          <Item>
            <h3>Human Resource Management System</h3>
            <p>Team Size: 30s</p>
            <p>Start Date: 2027-09-19 End Date: 2027-09-19</p>
            <p>This is for the Project Information Project Information</p>
            <LinearProgress variant="determinate" value={progress} />
          </Item>
          <Item>
            <h3>Human Resource Management System</h3>
            <p>Team Size: 30s</p>
            <p>Start Date: 2027-09-19 End Date: 2027-09-19</p>
            <p>This is for the Project Information Project Information</p>
            <LinearProgress variant="determinate" value={progress} />
          </Item>
          <Item>
            <h3>Human Resource Management System</h3>
            <p>Team Size: 30s</p>
            <p>Start Date: 2027-09-19 End Date: 2027-09-19</p>
            <p>This is for the Project Information Project Information</p>
            <LinearProgress variant="determinate" value={progress} />
          </Item>
        </Grid>

        <Grid item xs={4}>
          <p>Teams</p>
          <Item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Bivek Prasad Joshi"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Bivek
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          
        </Grid>
      </Grid>
    </>
  );
}
