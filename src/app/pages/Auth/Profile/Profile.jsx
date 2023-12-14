import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../utils/cookieHelper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";
import useAuth from "../../../../auth/hooks/component/login/useAuth";

const Profile = () => {
  const navigate = useNavigate();

  const {
    isSuperAdmin,
    isAdmin,
    isHr,
    isManager,
    isEmployee,
    isHrClerk,
  } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    if (isAdmin || isManager || isSuperAdmin || isHrClerk || isHr) {
      navigate("/admin/reset-password");
    } else {
      navigate("/employee/reset-password");
    }

    handleClose();
  };
  const handleProfile = () => {
    if (isAdmin || isManager || isSuperAdmin || isHrClerk || isHr) {
    navigate("/admin/myprofile");
    }else{
      navigate("/employee/myprofile");
    }
    handleClose();
  };
  const btnStyle = {
    color: "#fff",
  };

  const { data: loggedUserData } = useGetLoggedInUser();

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
        {loggedUserData?.name} <KeyboardArrowDownIcon />
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
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleChangePassword}>Reset Password</MenuItem>
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
