import React, { useState } from "react";
import { Box, SwipeableDrawer, Grid, Paper, List } from "@mui/material";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Divider, Typography, Button } from "@mui/material";
import ProjectTaskField from "../../../components/Form/Project/ProjectTask/ProjectTaskFields";
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

export default function ProjectHomePage({ data }) {
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
  const teamsData = [
    {
      img: "/static/images/avatar/1.jpg",
      info: "Brunch this weekend?",
      name: " Ali Connors",
      desc: " — I'll be in your neighborhood doing errands this…",
    },
    {
      img: "/static/images/avatar/1.jpg",
      info: "Brunch this weekend?",
      name: " Ali Connors",
      desc: " — I'll be in your neighborhood doing errands this…",
    },
    {
      img: "/static/images/avatar/1.jpg",
      info: "Brunch this weekend?",
      name: " Ali Connors",
      desc: " — I'll be in your neighborhood doing errands this…",
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <RightProjectHome />
        </Grid>

        <Grid item xs={4}>
          <p>Teams</p>
          <Item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {teamsData.map((team, index) => (
                <Box>
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={team.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={team.info}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {team.name}
                          </Typography>
                          {team.desc}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{margin:"0 1rem"}} />
                </Box>
              ))}
            </List>
          </Item>
        </Grid>     
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyTask data={data} />
        </Grid>
      </Grid>

      <div>
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
      </div>
    </>
  );
}
