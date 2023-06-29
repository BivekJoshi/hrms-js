// Header.js
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "@mui/material";
import { CakeOutlined } from "@mui/icons-material";
import TodayBirthday from "../../pages/Birthday/TodayBirthday";
import {
  useGetTodayBirthday,
  useRemoveNotification,
  // useRemoveNotification,
} from "../../hooks/birthday/useBirthday";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 260px)`,
    marginLeft: "260px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen }) {
  const [openNotification, setOpenNotification] = useState(false); // Moved inside the component function
  const { data, isLoading } = useGetTodayBirthday();

  const { mutate } = useRemoveNotification();
  const handleChange = () => {
    setOpenNotification(!openNotification);
  };

  useEffect(() => {
    if (openNotification) {
      mutate();
    }
  }, [openNotification]);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Human Resource Management System
        </Typography>
        <div
          style={{
            Color: "white",
            display: "flex",
            position: "absolute",
            right: "100px",
            top: "30px",
            width: "30px",
          }}
        >
          <Badge
            color="success"
            badgeContent={!data?.isChecked ? data?.birthdayEmployeeCount : 0}
          >
            <CakeOutlined
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleChange}
              style={{ color: "white", cursor: "pointer" }}
            />
          </Badge>
          {openNotification && (
            <TodayBirthday
              data={data}
              isLoading={isLoading}
              open={openNotification}
              setOpen={setOpenNotification}
            />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
