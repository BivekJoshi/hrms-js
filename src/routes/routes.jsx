import React, { lazy, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import Loadable from "../app/components/Header/Loader/Loadable";
import ThemeModeContext from "../theme/ThemeModeContext";
import ProjectAddViewEmployeePage from "../app/pages/Project/ProjectEmployeeViewPage/ProjectAddViewEmployeePage";
import { ProjectDashboard } from "../app/pages/Project/ProjectDashboard/ProjectDashboard";
import AttendenceInfo from "../app/pages/Employee/EmployeeViewPage/InfoTabs/AttendenceInfoTab/AttendenceInfo";
import ApplyLeaveLayout from "../app/pages/Leave/ApplyLeave/ApplyLeaveLayout";
import ApplyLeaveField from "../app/components/Form/Leave/ApplyLeave/ApplyLeaveField";
import ProjectEmpPage from "../app/pages/Project/ProjectEmployeeViewPage/ProjectEmppage";
import HomeIcon from "@mui/icons-material/Home";
import useAuth from "../auth/hooks/component/login/useAuth";
import DeactiveUser from "../app/pages/Auth/UserControl/Users/DeactiveUser";
import EventAttendance from "../app/pages/Event/EventAttendance/EventAttendance";
import EmploymentType from "../app/pages/EmploymentType/EmploymentType";
import EmailLog from "../app/pages/EmailLog/EmailLog";
import EmailLogUserId from "../app/pages/EmailLog/EmailLogUserId";
import WorkShift from "../app/pages/WorkShift/WorkShift";
import NewAttendance from "../app/pages/Attendance/NewAttendance";

const ProfileDetail = Loadable(
  lazy(() => import("../app/pages/Auth/Profile/ProfileDetail"))
);
const OfficeResource = Loadable(
  lazy(() => import("../app/pages/Resource/OfficeResource/OfficeResource"))
);
const EmployeeResource = Loadable(
  lazy(() => import("../app/pages/Resource/EmployeeResource/EmployeeResource"))
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
  lazy(() => import("../app/pages/Attendance/NewAttendance"))
);
const Project = Loadable(
  lazy(() => import("../app/pages/Project/ProjectAdminViewPage/Project"))
);
const ProjectDetail = Loadable(
  lazy(() => import("../app/pages/Project/ProjectAdminViewPage/ProjectDetail"))
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
const AssignDepartment = Loadable(
  lazy(() => import("../app/pages/Department/AssignDepartment"))
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

const EmployeeDashboard = Loadable(
  lazy(() =>
    import("../app/pages/EmployeePage/EmployeeDashboard/EmployeeDashbord")
  )
);
const Setting = Loadable(
  lazy(() => import("../app/pages/EmailConfiguration/Setting"))
);
const EmployeeMapping = Loadable(
  lazy(() => import("../app/pages/EmployeeMapping/EmployeeMapping"))
);
const Reports = Loadable(
  lazy(() => import("../app/pages/Reports/Reports.jsx"))
);

const EmployeeProfile = Loadable(
  lazy(() =>
    import(
      "../app/pages/Employee/EmployeeViewPage/EmployProfile/EmployeeProfile"
    )
  )
);

const routes = [
  {
    path: "dashboard",
    name: "Dashboard",
    id: nanoid(),
    component: <Dashboard />,
  },
  {
    path: "home",
    name: "Employee Dashboard",
    id: nanoid(),
    component: <EmployeeDashboard />,
  },
  {
    path: "project/dashboard",
    name: "Project Dashboard",
    id: nanoid(),
    component: <ProjectDashboard />,
  },
  {
    path: "emp/project/dashboard",
    name: "Project Dashboard",
    id: nanoid(),
    component: <ProjectDashboard />,
  },
  {
    path: "profile",
    name: "My Profile",
    id: nanoid(),
    component: <EmployeeProfile />,
  },
  {
    path: "employee",
    name: "Employee",
    id: nanoid(),
    component: <Employee component="employee" />,
  },
  //under employee
  {
    path: "employee/leaves",
    name: "Leave",
    id: nanoid(),
    component: <Leave component="leaves" />,
  },
  {
    path: "leaveType",
    id: nanoid(),
    component: <LeaveType component="leaveType" />,
  },
  {
    path: "employee/attendance",
    name: "Attendance",
    id: nanoid(),
    component: <Attendance />,
  },
  {
    path: "employee/birthday",
    name: "Birthday",
    id: nanoid(),
    component: <Birthdaylist />,
  },
  // finish
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
    component: <EmployeeProfile component="employeeProfile" />,
  },
  {
    path: "employee/edit/:id",
    name: "Edit Employee",
    id: nanoid(),
    component: <EditEmployee />,
  },

  {
    path: "designation",
    name: "Designation",
    id: nanoid(),
    component: <Designation component="designation" />,
  },
  {
    path: "branch",
    name: "Company",
    id: nanoid(),
    component: <Company component="company" />,
  },
  {
    path: "employment-type",
    name: "Employment Type",
    id: nanoid(),
    component: <EmploymentType component="employmenttype" />,
  },
  {
    path: "department",
    name: "Department",
    id: nanoid(),
    component: <Department component="department" />,
  },
  {
    path: "presence",
    name: "My Attendance",
    id: nanoid(),
    component: <AttendenceInfo />,
  },
  {
    path: "todolist",
    name: "To Do List",
    id: nanoid(),
    component: <TodoList component="todos" />,
  },
  {
    path: "leaveHistory",
    name: "Apply Leave",
    id: nanoid(),
    component: <ApplyLeaveLayout />,
  },
  {
    path: "applyleave",
    name: "Apply Leave",
    id: nanoid(),
    component: <ApplyLeaveField />,
  },
  {
    path: "projects",
    name: "Project",
    id: nanoid(),
    component: <Project component="project" />,
  },
  {
    path: "project/:id",
    name: "Project Detail",
    id: nanoid(),
    component: <ProjectAddViewEmployeePage component="projectTask" />,
  },
  // {
  //   path: "project/get-deactivated-projects",
  //   name: "Inactive Project",
  //   id: nanoid(),
  //   component: <DeactivatedProject component="deactivate-project" />,
  // },
  {
    path: "event",
    name: "Event",
    id: nanoid(),
    component: <Event component="event" />,
  },
  {
    path: "event/attendance",
    name: "Event Attendance",
    id: nanoid(),
    component: <EventAttendance component="eventAttendance" />,
  },
  {
    path: "holiday",
    name: "Holiday",
    id: nanoid(),
    component: <Holiday component="holiday" />,
  },
  // {
  //   path: "resource/Office/Deactivated",
  //   name: "Office Resource Deactivated",
  //   id: nanoid(),
  //   component: <DeactivatedOfficeResource component="resourceDeactivated"/>,
  // },
  {
    path: "availablelogistics",
    name: "Office Logistics",
    id: nanoid(),
    component: <OfficeResource component="officeResource" />,
  },
  {
    path: "logistics",
    name: "Employee Logistics",
    id: nanoid(),
    component: <EmployeeResource component="employeeResource" />,
  },

  {
    path: "users",
    name: "Users",
    id: nanoid(),
    component: <UserController component="users" />,
    requiresSuperAdmin: true,
  },
  {
    path: "project",
    name: "Project",
    id: nanoid(),
    component: <ProjectEmpPage component="project" />,
  },
  {
    path: "work-schedule",
    name: "Work Schedule",
    id: nanoid(),
    component: <WorkShift component="workShift" />,
  },
  {
    path: "reset-password",
    name: "Reset Password",
    id: nanoid(),
    component: <ResetPassword />,
  },
  {
    path: "myprofile",
    name: "Profile",
    id: nanoid(),
    component: <ProfileDetail />,
  },
  {
    path: "email",
    name: "Email",
    id: nanoid(),
    component: <Setting component="emailConfig" />,
  },
  {
    path: "users/deactivated",
    name: "User Deactivated",
    id: nanoid(),
    component: <DeactiveUser />,
  },
  {
    path: "mapping",
    name: "Employee Mapping",
    id: nanoid(),
    component: <EmployeeMapping />,
  },
  {
    path: "mail-log",
    name: "Email Log",
    id: nanoid(),
    component: <EmailLog />,
  },
  {
    path: "mail-log-id",
    name: "Email Log",
    id: nanoid(),
    component: <EmailLogUserId />,
  },
  // {
  //   path: "reports",
  //   name: "Reports",
  //   id: nanoid(),
  //   component: <Reports />,
  // },
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
  const { mode } = useContext(ThemeModeContext);
  const location = useLocation();
  let currentPath = location.pathname;
  const { isSuperAdmin, isAdmin, isHr, isManager, isEmployee, isHrClerk } =
    useAuth();

  const getDashboardLink = () => {
    if (isEmployee) {
      return "/employee/home";
    } else {
      return "/admin/dashboard";
    }
  };
  const pathBreadCrump = () => {
    if (isEmployee) {
      return currentPath.slice(9);
    } else {
      return currentPath.slice(7);
    }
  };
  const pathSegments = pathBreadCrump().split("/").filter(Boolean);

  const redirectTo = (path) => {
    const newPath = currentPath ? currentPath.split(path) : [];
    const actualPath = newPath.length > 0 ? `${newPath[0]}${path}` : path;
    return actualPath;
  };

  return (
    <>
      {pathSegments.length > 0 && (
        <Breadcrumbs>
          <Link
            underline="hover"
            style={{ color: mode === "light" ? "inherit" : "white" }}
            to={getDashboardLink()}
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
            const isLastSegment = index === pathSegments.length - 1;
            if (segment !== "edit" && isNaN(Number(segment))) {
              return (
                <Link
                  key={index}
                  underline="hover"
                  style={{
                    color: mode === "light" ? "inherit" : "white",
                    textDecoration: "none",
                  }}
                  to={redirectTo(segment)}
                >
                  <Typography
                    key={index}
                    color="text.primary"
                    textTransform="capitalize"
                    padding="5px"
                    textDecoration="none"
                    sx={{
                      "&:hover": {
                        bgcolor: "#6DAB2345",
                        padding: "5px",
                        textDecoration: "underline",
                        borderRadius: "5px",
                        color: "#6dab23",
                      },
                      fontWeight: isLastSegment ? 600 : 500,
                    }}
                  >
                    {segment}
                  </Typography>
                </Link>
              );
            }
          })}
        </Breadcrumbs>
      )}
    </>
  );
}
