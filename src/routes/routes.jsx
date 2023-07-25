import React, { lazy } from "react";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import Loadable from "../app/components/Header/Loader/Loadable";
import CustomBreadcrumb from "../theme/overrides/CustomBreadcrumb";

const EmployeeProfile = Loadable(lazy(() =>
  import("../app/pages/Employee/EmployeeViewPage/EmployProfile/EmployeeProfile")
));
const DeactivatedEmployee = Loadable(lazy(() =>
  import("../app/pages/Employee/DeactivatedEmployee/DeactivateEmployee")
));
const Birthdaylist = Loadable(lazy(() =>
  import("../app/pages/Birthday/Birthdaylist")
));
const Attendance = Loadable(lazy(() =>
  import("../app/pages/Attendance/Attendance")
));
const Project = Loadable(lazy(() =>
  import("../app/pages/Project/Project")
));
const ProjectDetail = Loadable(lazy(() =>
  import("../app/pages/Project/ProjectDetail/ProjectDetail")
));
const DeactivatedProject = Loadable(lazy(() =>
  import("../app/pages/Project/DeactivatedProject/DeactivatedProject")
));
const TodoList = Loadable(lazy(() =>
  import("../app/pages/TodoList/TodoList")
));
const Event = Loadable(lazy(() =>
  import("../app/pages/Event/Event")
));
const Holiday = Loadable(lazy(() =>
  import("../app/pages/Holiday/Holiday")
));
const Dashboard = Loadable(lazy(() =>
  import("../app/pages/Dashboard/Dashboard")
));
const Employee = Loadable(lazy(() =>
  import("../app/pages/Employee/Employee")
));
const Designation = Loadable(lazy(() =>
  import("../app/pages/Designation/Designation")
));
const Department = Loadable(lazy(() =>
  import("../app/pages/Department/Department")
));
const Company = Loadable(lazy(() =>
  import("../app/pages/Company/Company")
));
const LeaveType = Loadable(lazy(() =>
  import("../app/pages/LeaveType/LeaveType")
));
const Leave = Loadable(lazy(() =>
  import("../app/pages/Leave/Leave")
));
const EditEmployee = Loadable(lazy(() =>
  import("../app/pages/Employee/AddEmployee/EditEmployee")
));

const routes = [
  {
    path: "dashboard",
    id: nanoid(),
    component: <Dashboard />,
  },
  {
    path: "employee",
    id: nanoid(),
    component: <Employee />,
  },
  {
    path: "employee/deactivated",
    id: nanoid(),
    component: <DeactivatedEmployee />,
  },
  {
    path: "employee/:id",
    id: nanoid(),
    component: <EmployeeProfile />,
  },
  {
    path: "employee/edit/:id",
    id: nanoid(),
    component: <EditEmployee />,
  },
  {
    path: "leavetype",
    id: nanoid(),
    component: <LeaveType />,
  },
  {
    path: "leave",
    id: nanoid(),
    component: <Leave />,
  },
  {
    path: "designation",
    id: nanoid(),
    component: <Designation />,
  },
  {
    path: "company",
    id: nanoid(),
    component: <Company />,
  },
  {
    path: "department",
    id: nanoid(),
    component: <Department />,
  },
  {
    path: "birthday",
    id: nanoid(),
    component: <Birthdaylist />,
  },
  {
    path: "attendance",
    id: nanoid(),
    component: <Attendance />,
  },
  {
    path: "todolist",
    id: nanoid(),
    component: <TodoList />,
  },
  {
    path: "project",
    id: nanoid(),
    component: <Project />,
  },
  {
    path: "project/:id",
    id: nanoid(),
    component: <ProjectDetail />,
  },
  {
    path: "project/get-deactivated-projects",
    id: nanoid(),
    component: <DeactivatedProject />,
  },
  {
    path: "event",
    id: nanoid(),
    component: <Event />,
  },
  {
    path: "holiday",
    id: nanoid(),
    component: <Holiday />,
  },
];

export { routes };

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
  const location = useLocation();
  const currentPath = location.pathname;
  return <CustomBreadcrumb routes={routes} currentPath={currentPath} />;
}
