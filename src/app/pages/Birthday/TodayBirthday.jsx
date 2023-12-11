import React, { useState, useRef, useContext } from "react";
import { Button, Box, Popper, Grow, Paper, MenuItem, Badge, IconButton, Tooltip, ClickAwayListener, MenuList, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import "../Style/Style.css";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";
import '../Style/Style.css';

const TodayBirthday = ({ data }) => {
  const birthdayEmployeeName = data?.birthdayEmployees;
  const birthdayEmployeeCount = data?.birthdayEmployeeCount || 0;
  const displayCount = birthdayEmployeeCount > 0 ? birthdayEmployeeCount : null;
  const { mode } = useContext(ThemeModeContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const employeeId =
    birthdayEmployeeName && birthdayEmployeeName.map((name) => name?.id);
 
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleClick = () => {
    navigate(`/admin/employee/${employeeId}`);
    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const btnStyle = {
    color: '#fff',
  };

  return (
    <Box>
      <IconButton ref={anchorRef} onClick={handleToggle} style={btnStyle}>
        <Tooltip title='Birthday Notification'>
          <Badge
            badgeContent={data?.isChecked ? '' : displayCount}
            color='secondary'
          >
            <CakeIcon />
          </Badge>
        </Tooltip>
      </IconButton>
      {birthdayEmployeeCount !== 0 ? (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
          style={{ marginLeft: '-4rem' }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                background: mode === 'light' ? '' : '#4d4c4c',
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}
                    sx={{
                      textAlign: 'center',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    <Typography
                      variant='h6'
                      color={mode === 'light' ? 'primary' : 'white'}
                      fontWeight={400}
                    >
                      Today's Birthday
                    </Typography>
                    {birthdayEmployeeName &&
                      birthdayEmployeeName.map((bname, index) => (
                        <MenuItem
                          key={index}
                          onClick={handleClick}
                          sx={{ justifyContent: 'center' }}
                        >
                          {bname.fullName}
                        </MenuItem>
                      ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      ) : (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
          style={{ width: { xs: '30%', lg: '15%' }, marginLeft: '-4rem' }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                background: mode === 'light' ? '' : '#4d4c4c',
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}
                    sx={{
                      textAlign: 'center',
                      width: '100%',
                      padding: '1rem 2rem',
                    }}
                  >
                    <Typography
                      variant='h7'
                      color={mode === 'light' ? 'primary' : 'white'}
                    >
                      No One Birthday !
                    </Typography>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
};

export default TodayBirthday;
