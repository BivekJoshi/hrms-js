import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Cake } from "@mui/icons-material";
import { useGetTodayBirthday } from "../../hooks/birthday/useBirthday";
import PersonIcon from "@mui/icons-material/Person";
const TodayBirthday = () => {
  const [open, setOpen] = useState(false);
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const { data: TodayBirthdayData, isloading } = useGetTodayBirthday();

  const checkTodayBirthdays = () => {
    const today = new Date();
    const formattedToday = `${today.getMonth() + 1}-${today.getDate()}`;

    const birthdays = TodayBirthdayData
      ? TodayBirthdayData.filter((employee) => {
          const date = new Date(employee.dateOfBirth);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const outputDate = `${month}-${day}`;
          return outputDate === formattedToday;
        })
      : [];

    setTodayBirthdays(birthdays);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={checkTodayBirthdays}
      >
        <Cake style={{ color: "white" }} />
      </Button>
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
          {todayBirthdays.length > 0 &&
            todayBirthdays.map((employees, index) => (
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
            ))}
        </div>
      </Menu>
    </div>
  );
};

export default TodayBirthday;
