import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Button, Grid } from "@mui/material";
import "./project.css";

const Project = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        On-Going Projects
      </Typography>
      <Grid container spacing={3}>
      {arr.map((item, index) => (
        <Grid item
        key={index}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          <Card style={{ maxWidth: 345 }} className="card-all">
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500], fontSize: "12px" }}
                  aria-label="recipe"
                >
                  LOGO
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <Button variant="contained">Edit</Button>
                </IconButton>
              }
              title="HRMS "
              subheader="September 14, 2016"
            />
            <CardContent sx={{ cursor: "pointer" }}>
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
                  className="card-content"
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
                <Grid className="card-position">
                <Typography variant="p" className="card-id">
                  id
                </Typography>
                <Typography variant="p" className="card-status">
                  Work In Progress
                </Typography>
                </Grid>
              </div>
            </CardContent>

            <CardContent
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Typography variant="body2" color="text.secondary">
                Deadline
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2023-08-22
              </Typography>
            </CardContent>
            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItemButton>
                <ListItemIcon>
                  <Groups2Icon />
                </ListItemIcon>
                <ListItemText primary="Lead Project ID:" />
                <ListItemText primary="1" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Groups2Icon />
                </ListItemIcon>
                <ListItemText primary="Company ID:" />
                <ListItemText primary="1" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>
      ))}
      </Grid>
    </>
  );
};

export default Project;
