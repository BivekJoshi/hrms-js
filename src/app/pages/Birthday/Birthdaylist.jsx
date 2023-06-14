import React, { useEffect, useState, useContext } from "react";

import { addMonths, format } from "date-fns";
import Birthdaytable from "./Birthdaytable";
import { useGetUpcomingBirthday } from "../../hooks/birthday/useBirthday";
import { Typography } from "@mui/material";

const Birthdaylist = () => {
  const today = new Date();
  const { data: upcomingBirthdayData, isloading } = useGetUpcomingBirthday();
  const thisMonth = today.getMonth();
  const upcomingMonth = (thisMonth + 1) % 12;

  const thisMonthBirthdays = upcomingBirthdayData
    ? upcomingBirthdayData
        .filter((employee) => {
          const dateOfBirth = new Date(employee.dateOfBirth);
          return dateOfBirth.getMonth() === thisMonth;
        })
        .sort((a, b) => {
          const adateOfBirth = new Date(a.dateOfBirth);
          const bdateOfBirth = new Date(b.dateOfBirth);
          return adateOfBirth.getDate() - bdateOfBirth.getDate();
        })
    : [];

  const upcomingBirthdays = upcomingBirthdayData
    ? upcomingBirthdayData
        .filter((employee) => {
          const dateOfBirth = new Date(employee.dateOfBirth);
          return dateOfBirth.getMonth() === upcomingMonth;
        })
        .sort((a, b) => {
          const adateOfBirth = new Date(a.dateOfBirth);
          const bdateOfBirth = new Date(b.dateOfBirth);
          return adateOfBirth.getDate() - bdateOfBirth.getDate();
        })
    : [];

  return (
    <div>
      <Typography variant="h4" noWrap component="div">
        Birthday List of Employees
      </Typography>

      <Birthdaytable
        data={thisMonthBirthdays}
        currMonth={format(new Date(), "MMMM")}
      />

      <Birthdaytable
        data={upcomingBirthdays}
        currMonth={format(addMonths(new Date(), 1), "MMMM")}
      />
    </div>
  );
};

export default Birthdaylist;
