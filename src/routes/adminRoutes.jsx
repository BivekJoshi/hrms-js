import React, { lazy, useContext } from "react";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import Loadable from "../app/components/Header/Loader/Loadable";
import ThemeModeContext from "../theme/ThemeModeContext";

const ProfileDetail = Loadable(
  lazy(() => import("../app/pages/Auth/Profile/ProfileDetail"))
);
const DeactivatedOfficeResource = Loadable(
  lazy(() =>
    import("../app/pages/Resource/OfficeResource/DeactivatedOfficeResource")
  )
);
const OfficeResource = Loadable(
  lazy(() => import("../app/pages/Resource/OfficeResource/OfficeResource"))
);
const EmployeeResource = Loadable(
  lazy(() => import("../app/pages/Resource/EmployeeResource/EmployeeResource"))
);
const EmployeeProfile = Loadable(
  lazy(() =>
    import(
      "../app/pages/Employee/EmployeeViewPage/EmployProfile/EmployeeProfile"
    )
  )
);
const DeactivatedEmployee = Loadable(
  lazy(() =>
    import("../app/pages/Employee/DeactivatedEmployee/DeactivateEmployee")
  )
);
const Birthdaylist = Loadable(
  lazy(() => import("../app/pages/Birthday/Birthdaylist"))
);
const Attendance = Loadable(
  lazy(() => import("../app/pages/Attendance/Attendance"))
);
const Project = Loadable(lazy(() => import("../app/pages/Project/Project")));
const ProjectDetail = Loadable(
  lazy(() => import("../app/pages/Project/ProjectDetail/ProjectDetail"))
);
const DeactivatedProject = Loadable(
  lazy(() =>
    import("../app/pages/Project/DeactivatedProject/DeactivatedProject")
  )
);
const TodoList = Loadable(lazy(() => import("../app/pages/TodoList/TodoList")));

const Event = Loadable(lazy(() => import("../app/pages/Event/Event")));
const Holiday = Loadable(lazy(() => import("../app/pages/Holiday/Holiday")));
const Dashboard = Loadable(
  lazy(() => import("../app/pages/Dashboard/Dashboard"))
);
const Employee = Loadable(lazy(() => import("../app/pages/Employee/Employee")));
const Designation = Loadable(
  lazy(() => import("../app/pages/Designation/Designation"))
);
const Department = Loadable(
  lazy(() => import("../app/pages/Department/Department"))
);
const Company = Loadable(lazy(() => import("../app/pages/Company/Company")));
const LeaveType = Loadable(
  lazy(() => import("../app/pages/LeaveType/LeaveType"))
);
const Leave = Loadable(lazy(() => import("../app/pages/Leave/Leave")));
const EditEmployee = Loadable(
  lazy(() => import("../app/pages/Employee/AddEmployee/EditEmployee"))
);
const ResetPassword = Loadable(
  lazy(() => import("../app/pages/Auth/ResetPassword/ResetPassword"))
);
const UserController = Loadable(
  lazy(() => import("../app/pages/Auth/UserControl/UserController"))
);

const adminRoutes = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: <Dashboard />,
  },
  {
    path: "employee",
    name: "Employee",
    id: nanoid(),
    component: <Employee component="employee" />,
  },
  {
    path: "employee/deactivated",
    name: "Deactivate",
    id: nanoid(),
    component: <DeactivatedEmployee />,
  },
  {
    path: "employee/:id",
    name: "Employee Profile",
    id: nanoid(),
    component: <EmployeeProfile />,
  },
  {
    path: "employee/edit/:id",
    name: "Edit Employee",
    id: nanoid(),
    component: <EditEmployee />,
  },
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
    component: <Designation component="designation" />,
  },
  {
    path: "company",
    name: "Company",
    id: nanoid(),
    component: <Company component="company" />,
  },
  {
    path: "department",
    name: "Department",
    id: nanoid(),
    component: <Department component="department" />,
  },
  {
    path: "birthday",
    name: "Birthday",
    id: nanoid(),
    component: <Birthdaylist />,
  },
  {
    path: "attendance",
    name: "Attendance",
    id: nanoid(),
    component: <Attendance />,
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
    component: <Project component="project" />,
  },
  {
    path: "project/:id",
    name: "Project Detail",
    id: nanoid(),
    component: <ProjectDetail />,
  },
  {
    path: "project/get-deactivated-projects",
    name: "Inactive Project",
    id: nanoid(),
    component: <DeactivatedProject component="deactivate-project" />,
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
  {
    path: "profile",
    name: "Profile",
    id: nanoid(),
    component: <ProfileDetail />,
  },
  {
    path: "resource/Office/Deactivated",
    name: "Office Resource Deactivated",
    id: nanoid(),
    component: <DeactivatedOfficeResource />,
  },
  {
    path: "resource/office",
    name: "Office Resource",
    id: nanoid(),
    component: <OfficeResource />,
  },
  {
    path: "resource/employee",
    name: "Employee Resource",
    id: nanoid(),
    component: <EmployeeResource />,
  },
  {
    path: "users",
    name: "Users",
    id: nanoid(),
    component: <UserController component="users" />,
    requiresSuperAdmin: true,
  },
];

export { adminRoutes };

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
  const currentRoute = adminRoutes.find(
    (route) => "/admin/" + route?.path === currentPath
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
