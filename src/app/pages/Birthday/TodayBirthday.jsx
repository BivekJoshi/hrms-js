import React, { useReducer, createContext } from "react";
import { Menu, MenuItem } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const TodayBirthday = ({ open, setOpen, data, isLoading }) => {
  // const checkTodayBirthdays = () => {
  //   const today = new Date();
  //   const formattedToday = `${today.getMonth() + 1}-${today.getDate()}`;

  //   const birthdays = TodayBirthdayData
  //     ? TodayBirthdayData.filter((employee) => {
  //         const date = new Date(employee.dateOfBirth);
  //         const month = date.getMonth() + 1;
  //         const day = date.getDate();
  //         const outputDate = `${month}-${day}`;
  //         return outputDate === formattedToday;
  //       })
  //     : [];

  // setTodayBirthdays(birthdays);

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
            data.length > 0 &&
            data.map((employees, index) => (
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
                    <p style={{ fontSize: "16px" }}>
                      {employees.firstName} {employees.middleName}{" "}
                      {employees.lastName}
                    </p>
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
