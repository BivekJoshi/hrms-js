import React from "react";
import { Stack, Typography, List, Button, Box } from "@mui/material";
import { Menu, MenuItem, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import { NavLink } from "react-router-dom";
import {
  useGetTodayBirthday,
  useRemoveNotification,
} from "../../hooks/birthday/useBirthday";
import "../Style/Style.css";

const TodayBirthday = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const birthdayEmployeeName = data?.birthdayEmployees;
  const birthdayEmployeeCount = data?.birthdayEmployeeCount || 0;
  const displayCount = birthdayEmployeeCount > 0 ? birthdayEmployeeCount : null;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeNotificationMutation = useRemoveNotification();

  const handleClick = () => {
    removeNotificationMutation.mutate();
    setAnchorEl((prevAnchorEl) => !prevAnchorEl);
  };

  const btnStyle = {
    color: "#fff",
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={btnStyle}
      >
        <CakeIcon />
        {data?.isChecked ? "" : displayCount}
      </Button>
      <Menu
        // className="todayBN"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack>
          <List>
            <MenuItem disablePadding>
              <Typography variant="h6" color="primary" fontWeight={400}>
                Today's Birthday:
              </Typography>
            </MenuItem>
            <Divider />
            {birthdayEmployeeName &&
              birthdayEmployeeName.map((bname, index) => (
                <NavLink to={`employee/${bname?.id}`} key={bname?.id}>
                  <MenuItem
                    style={{
                      color: "green",
                      display: "inline-block",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    key={index}
                    onClick={handleClose}
                  ></MenuItem>
                  <div
                    style={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Typography style={{ height: "25px" }}>
                      <PersonIcon />
                    </Typography>
                    <Typography variant="h6">{bname?.fullName}</Typography>
                  </div>
                </NavLink>
              ))}
          </List>
        </Stack>
      </Menu>
    </Box>
  );
};

export default TodayBirthday;