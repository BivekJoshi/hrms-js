import React, { lazy, useContext } from "react";
import { nanoid } from "nanoid";
import Loadable from "../app/components/Header/Loader/Loadable";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ThemeModeContext from "../theme/ThemeModeContext";
import EmployeeProfile from "../app/pages/Employee/EmployeeViewPage/EmployProfile/EmployeeProfile";
import AttendenceInfo from "../app/pages/Employee/EmployeeViewPage/InfoTabs/AttendenceInfoTab/AttendenceInfo";
import ProjectEmpPage from "../app/pages/Project/ProjectEmployeeViewPage/ProjectEmppage";
import EditEmployee from "../app/pages/Employee/AddEmployee/EditEmployee";
import ProfileDetail from "../app/pages/Auth/Profile/ProfileDetail";
import { ProjectDashboard } from "../app/pages/Project/ProjectDashboard/ProjectDashboard";
import HomeIcon from "@mui/icons-material/Home";

const ResetPassword = Loadable(
  lazy(() => import("../app/pages/Auth/ResetPassword/ResetPassword"))
);
const EmployeeDashboard = Loadable(
  lazy(() =>
    import("../app/pages/EmployeePage/EmployeeDashboard/EmployeeDashbord")
  )
);
const ApplyLeaveLayout = Loadable(
  lazy(() => import("../app/pages/Leave/ApplyLeave/ApplyLeaveLayout"))
);
const ApplyLeaveField = Loadable(
  lazy(() => import("../app/components/Form/Leave/ApplyLeave/ApplyLeaveField"))
);
const Designation = Loadable(
  lazy(() => import("../app/pages/Designation/Designation"))
);
const Department = Loadable(
  lazy(() => import("../app/pages/Department/Department"))
);
// const LeaveType = Loadable(
//   lazy(() => import("../app/pages/LeaveType/LeaveType"))
// );
const Event = Loadable(lazy(() => import("../app/pages/Event/Event")));
const Holiday = Loadable(lazy(() => import("../app/pages/Holiday/Holiday")));
const Project = Loadable(
  lazy(() => import("../app/pages/Project/ProjectAdminViewPage/Project"))
);
const TodoList = Loadable(lazy(() => import("../app/pages/TodoList/TodoList")));
const Company = Loadable(lazy(() => import("../app/pages/Company/Company")));

const employeeRoutes = [
  {
    path: "dashboard",
    // name: "Employee Dashboard",
    id: nanoid(),
    component: <EmployeeDashboard />,
  },
  {
    path: "project/dashboard",
    name: "Project Dashboard",
    id: nanoid(),
    component: <ProjectDashboard />,
  },
  // {
  //   path: `viewprofile/${loggedUserData?.id}`,
  //   name: "Profile",
  //   id: nanoid(),
  //   component: <EmployeeProfile />,
  // },
  {
    path: "viewprofile",
    name: "My Profile",
    id: nanoid(),
    component: <EmployeeProfile />,
  },
  {
    path: "employee/edit/:id",
    name: "Edit My Profile",
    id: nanoid(),
    component: <EditEmployee />,
  },
  {
    path: "attendance",
    name: "My Attendance",
    id: nanoid(),
    component: <AttendenceInfo />,
  },
  // {
  //   path: "leavetype",
  //   name: "Leave Type",
  //   id: nanoid(),
  //   component: <LeaveType component="leaveType"/>,
  // },
  {
    path: "applyleave",
    name: "Apply Leave",
    id: nanoid(),
    component: <ApplyLeaveLayout />,
  },
  {
    path: "applyleavefield",
    name: "Apply Leave",
    id: nanoid(),
    component: <ApplyLeaveField />,
  },
  // {
  //   path: "designation",
  //   name: "Designation",
  //   id: nanoid(),
  //   component: <Designation component="designation"/>,
  // },
  // {
  //   path: "company",
  //   name: "Company",
  //   id: nanoid(),
  //   component: <Company component="company"/>,
  // },
  // {
  //   path: "department",
  //   name: "Department",
  //   id: nanoid(),
  //   component: <Department component="department"/>,
  // },
  {
    path: "todolist",
    name: "To Do List",
    id: nanoid(),
    component: <TodoList component="todo"/>,
  },
  {
    path: "project",
    name: "Project",
    id: nanoid(),
    component: <ProjectEmpPage component="project"/>,
  },
  {
    path: "event",
    name: "Event",
    id: nanoid(),
    component: <Event component="event"/>,
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
  const findRoute = (path) => employeeRoutes.find((route) => route.path === path);
  const breadcrumbPath = currentPath.slice(10);
  const pathSegments = breadcrumbPath.split("/").filter(Boolean);
  console.log(currentPath);
  return (
    <>
    {pathSegments.length > 0 && (
      <Breadcrumbs>
        <Link
          underline="hover"
          style={{ color: mode === "light" ? "inherit" : "white" }}
          to="/employee/dashboard"
        >
          <HomeIcon
            sx={{
              width: "2rem",
              "&:hover": {
                color: "#6dab23",
              },
            }}
          />{" "}
        </Link>
        {pathSegments.map((segment, index) => {
          const partialPath = `/${pathSegments
            .slice(0, index + 1)
            .join("/")}`;
          const route = findRoute(partialPath);
          return (
            <Link
              key={index}
              underline="hover"
              style={{ color: mode === "light" ? "inherit" : "white" }}
              to={`/employee${partialPath}`}
            >
              <Typography
                key={index}
                color="text.primary"
                textTransform="capitalize"
                padding="5px"
                sx={{
                  "&:hover": {
                    bgcolor: "#6DAB2345",
                    padding: "5px",
                    textDecoration: "underline",
                    borderRadius: "5px",
                    color:"#6dab23"
                  },
                }}
              >
                {route ? route.name : segment}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    )}
  </>
  );
}