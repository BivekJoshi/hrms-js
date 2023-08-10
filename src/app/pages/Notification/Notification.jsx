import React from "react";
import { Stack, Typography, List, ListItemText } from "@mui/material";
import { Button, Menu, MenuItem, Divider, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import { useGetHolidayCurrent } from "../../hooks/holiday/useHoliday";
import { useGetEvent } from "../../hooks/event/useEvent";

const Notification = ({ data }) => {
  const { data: events } = useGetEvent();
  const { data: holidays, isLoading, isError } = useGetHolidayCurrent();

  const todayDate = new Date().toISOString().split("T")[0];
  const todayHoliday = events?.filter(
    (event) => event?.holidayDate === todayDate
  );
  const todayEvent = events?.length;

  const notificationNumber =
    (todayEvent?.length ?? 0) + (todayHoliday?.length ?? 0);

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
        <NotificationsIcon />
        {todayEvent}
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
          <Typography
            variant="h6"
            color="primary"
            fontWeight={400}
            padding="1rem 1rem 0.5rem"
          >
            {todayEvent !== 0 ? "Today's Event:" : "No Event Today!"}
          </Typography>
          <List>
            {todayEvent !== 0 && <Divider />}
            {events &&
              events.map((item) => (
                <MenuItem key={item.id} sx={{ background: "#ffe4c459" }}>
                  <ListItemText primary={item?.eventName} />
                </MenuItem>
              ))}
          </List>
        </Stack>
      </Menu>
    </Box>
  );
};

export default Notification;