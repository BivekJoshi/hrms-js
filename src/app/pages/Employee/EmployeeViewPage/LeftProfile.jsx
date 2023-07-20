import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { useGetDocumentById } from "../../../hooks/employee/useDocument";

const primaryColor = "#1c7ed6";

const LeftProfile = ({ data, photo }) => {
  const realPath = photo && photo[0]?.path;

  return (
    <div>
      <Box
        className="profileBasic"
        sx={{
          width: 350,
          height: 600,
          bgcolor: "#cfe8fc",
          borderRadius: 5,
        }}
      >
        <Avatar
          sx={{
            width: 190,
            height: 190,
            bgcolor: primaryColor,
            alignSelf: "center",
          }}
          // variant='circle'
          // src='/broken-image.jpg'
          src={realPath}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            style={{
              color: primaryColor,
              fontSize: "larger",
              fontWeight: "bolder",
            }}
          >
            {data?.firstName + " " + data?.middleName + " " + data?.lastName}
          </Typography>
          <Chip
            label={data?.position.positionName}
            style={{
              backgroundColor: primaryColor,
              color: "white",
              width: " 9rem",
            }}
          />
        </div>

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            borderRadius: 5,
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: primaryColor }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Employee ID" secondary={data?.id} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: primaryColor }}>
                <EmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={data?.officeEmail} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: primaryColor }}>
                <CalendarMonthIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Date of Join" secondary={data?.dateOfJoin} />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default LeftProfile;
