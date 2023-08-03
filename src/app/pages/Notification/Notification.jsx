import React from "react";
import {
  Stack,
  Typography,
  List,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import { useGetHolidayCurrent } from "../../hooks/holiday/useHoliday";
import { useGetEvent } from "../../hooks/event/useEvent";

const Notification = ({ data }) => {
  const { data: events } = useGetEvent();
  const { data: holidays, isLoading, isError } = useGetHolidayCurrent();

  const todayDate = new Date().toISOString().split("T")[0];
  const todayHoliday = holidays?.filter(
    (event) => event?.holidayDate === todayDate
  );
  const todayEvent = events?.filter((event) => event?.eventDate === todayDate);

  const notificationNumber =
    (todayEvent?.length ?? 0) +
    (todayHoliday?.length ?? 0);

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
        {notificationNumber}
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
              <Typography variant="h6" color="primary" fontWeight={400}>
              {notificationNumber !== 0 ? "Today's Holiday:" : "No Holiday Today!"}
              </Typography>
            </MenuItem>
            {notificationNumber !== 0 && <Divider />}
            {todayHoliday &&
              todayHoliday.map((item) => (
                <MenuItem key={item.id}>
                  <ListItemText primary={item?.holidayName} />
                </MenuItem>
              ))}
          </List>
        </Stack>
        {notificationNumber !== 0 && <Divider />}
      </Menu>
    </Box>
  );
};

export default Notification;
