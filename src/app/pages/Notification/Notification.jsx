import React from "react";
import { Stack, Typography, List, ListItem, ListItemText, Button, Menu, MenuItem, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import { useGetHolidayCurrent } from "../../hooks/holiday/useHoliday";
import { useGetEvent } from "../../hooks/event/useEvent";

 const Notification = ({data}) => {
  const { data: events } = useGetEvent();
  const { data: holidays, isLoading, isError } = useGetHolidayCurrent();
  const todayBirthday = data;


  const todayDate = new Date().toISOString().split("T")[0];
  const todayHoliday = holidays?.filter((event) => event?.holidayDate === todayDate);
  const todayEvent = events?.filter((event) => event?.eventDate === todayDate);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isError) {
    return <div>Error fetching data.</div>;
  }
  const btnStyle = {
    color: "#fff",
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={btnStyle}
      >
        <NotificationsIcon />
      </Button>
      <Menu
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
                  <Typography variant="h6" color="primary" fontWeight={400}>Today's Holiday: </Typography>
                </MenuItem>
                <Divider />
                {todayHoliday ? todayHoliday.map((item) => (
                  <MenuItem key={item.id}>
                    <ListItemText primary={item?.holidayName} />
                  </MenuItem>
                )): ("No Holiday Today!")}
              </List>
            </Stack>

            <Stack>
              <List>
                <MenuItem disablePadding>
                  <Typography variant="h6" color="primary" fontWeight={400}>Today's Event: </Typography>
                </MenuItem>
                <Divider />
                {todayEvent ? todayEvent.map((item) => (
                  <MenuItem key={item.id}>
                    <ListItemText primary={item?.eventName} />
                  </MenuItem>
                )): ("No Event Today!")}
              </List>
            </Stack>

            <Stack>
              <List>
                <MenuItem disablePadding>
                  <Typography variant="h6" color="primary" fontWeight={400}>Today's Brithday: </Typography>
                </MenuItem>
                <Divider />
                {todayBirthday ? todayBirthday.map((item) => (
                  <MenuItem key={item.id}>
                    <ListItemText primary={item?.fullName} />
                  </MenuItem>
                )): ("No Brithday Today!")}
              </List>
            </Stack>

           <Divider />
      </Menu>
    </div>
  );
}

export default Notification;