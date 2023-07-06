import React from "react";
import { Menu, MenuItem } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";

const TodayBirthday = ({ open, setOpen, data, isLoading }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={document.getElementById("basic-button")}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div style={{ width: "300px" }}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Today's Birthdays!!
          </p>
          {!isLoading &&
            data.birthdayEmployees.length > 0 &&
            data.birthdayEmployees?.map((employees, index) => (
              <NavLink to={"birthday"} key={employees.id}>
                <MenuItem
                  style={{
                    color: "green",
                    display: "inline-block",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={index}
                  onClick={handleClose}
                >
                  <div
                    style={{
                      display: "flex",
                      columnGap: "10px",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ height: "25px" }}>
                      <PersonIcon />
                    </p>
                    <p style={{ fontSize: "16px" }}>{employees?.fullName||''}</p>
                  </div>
                </MenuItem>
              </NavLink>
            ))}
        </div>
      </Menu>
    </div>
  );
};

export default TodayBirthday;
