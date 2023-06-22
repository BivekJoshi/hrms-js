import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const ReviewCard = () => {
  const [open, setOpen] = React.useState(Array(7).fill(false));

  const handleClick = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = !updatedOpen[index];
    setOpen(updatedOpen);
  };

  const arr = [1, 2, 3, 4, 5, 6, 7];
  
  return (
    <>
      <Grid container spacing={3}>
        {arr.map((item, index) => (
          <Grid
          item
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
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500], fontSize: "12px" }} aria-label="recipe">
                  LOGO
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="HRMS "
              subheader="September 14, 2016"
            />
            <CardContent>
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
              </div>
            </CardContent>

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal
                to cook together with your guests. Add 1 cup of frozen peas
                along with the mussels, if you like.
              </Typography>
            </CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={() => handleClick(index)}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Total Members" />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Ram" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Hari" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Shyam" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
          </Card>
        </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ReviewCard;