import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../utils/cookieHelper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThemeModeContext from '../../../../theme/ThemeModeContext';

const Profile = (loggedUserData) => {
  const { palette } = useContext(ThemeModeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    navigate(`reset-password`);
    handleClose();
  };
  const handleProfile = () => {
    navigate(`myprofile`);
    handleClose();
  };
  const btnStyle = {
    color: "#fff",
  };

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
        {loggedUserData?.loggedUserData?.name} <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {background: palette.mode === 'light' ? '' : palette?.background?.default},
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem
          onClick={() => {
            removeUser();
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
