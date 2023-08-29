import React, { lazy, useContext } from "react";
import { nanoid } from "nanoid";
import Loadable from "../app/components/Header/Loader/Loadable";
import LeaveType from "../app/pages/LeaveType/LeaveType";
import Leave from "../app/pages/Leave/Leave";
import Designation from "../app/pages/Designation/Designation";
import Company from "../app/pages/Company/Company";
import Department from "../app/pages/Department/Department";
import TodoList from "../app/pages/TodoList/TodoList";
import Project from "../app/pages/Project/Project";
import Event from "../app/pages/Event/Event";
import Holiday from "../app/pages/Holiday/Holiday";
import ResetPassword from "../app/pages/Auth/ResetPassword/ResetPassword";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ThemeModeContext from "../theme/ThemeModeContext";
import EmployeeProfile from "../app/pages/Employee/EmployeeViewPage/EmployProfile/EmployeeProfile";
// import { useGetLoggedInUser } from "../app/hooks/auth/usePassword";

const EmployeeDashboard = Loadable(
  lazy(() =>
    import("../app/pages/EmployeePage/EmployeeDashboard/EmployeeDashbord")
  )
);
// const { data: loggedUserData } = useGetLoggedInUser();
// console.log(loggedUserData);
const employeeRoutes = [
  {
    path: "dashboard",
    name: "Employee Dashboard",
    id: nanoid(),
    component: <EmployeeDashboard />,
  },
  // {
  //   path: `viewprofile/${loggedUserData?.id}`,
  //   name: "Profile",
  //   id: nanoid(),
  //   component: <EmployeeProfile />,
  // },
  {
    path: "leavetype",
    name: "Leave Type",
    id: nanoid(),
    component: <LeaveType />,
  },
  {
    path: "leave",
    name: "Leave",
    id: nanoid(),
    component: <Leave />,
  },
  {
    path: "designation",
    name: "Designation",
    id: nanoid(),
    component: <Designation />,
  },
  {
    path: "company",
    name: "Company",
    id: nanoid(),
    component: <Company />,
  },
  {
    path: "department",
    name: "Department",
    id: nanoid(),
    component: <Department />,
  },
  {
    path: "todolist",
    name: "To Do List",
    id: nanoid(),
    component: <TodoList />,
  },
  {
    path: "project",
    name: "Project",
    id: nanoid(),
    component: <Project />,
  },
  {
    path: "event",
    name: "Event",
    id: nanoid(),
    component: <Event />,
  },
  {
    path: "holiday",
    name: "Holiday",
    id: nanoid(),
    component: <Holiday />,
  },
  {
    path: "reset-password",
    name: "Reset Password",
    id: nanoid(),
    component: <ResetPassword />,
  },
];

export { employeeRoutes };


<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    MUI
  </Link>
  <Link
    underline="hover"
    color="inherit"
    to="/material-ui/getting-started/installation/"
  >
    Core
  </Link>
  <Typography color="text.primary">Breadcrumbs</Typography>
</Breadcrumbs>;

export default function BreadCrumbs() {
  const { mode } = useContext(ThemeModeContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentRoute = employeeRoutes.find(
    (route) => "/employee/" + route?.path === currentPath
  );

  return (
    <>
      {currentRoute &&
        (currentRoute.path === "dashboard" ? (
          <Typography color="text.primary">{currentRoute?.name}</Typography>
        ) : (
          <Breadcrumbs>
            <Link
              underline="hover"
              style={{ color: mode === "light" ? "inherit" : "white" }}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
            <Typography color="text.primary">{currentRoute?.name}</Typography>
          </Breadcrumbs>
        ))}
    </>
  );
}
