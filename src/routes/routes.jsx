import { nanoid } from "nanoid";
import Loadable from "../app/components/Header/Loader/Loadable";
import React, { lazy } from "react";
import Birthdaylist from "../app/pages/Birthday/Birthdaylist";
import Attendance from "../app/pages/Attendance/Attendance";
import TodoList from "../app/pages/TodoList/TodoList";

const Dashboard = Loadable(lazy(() => import('../app/pages/Dashboard/Dashboard')));
const Employee = Loadable(lazy(() => import('../app/pages/Employee/Employee')));
const Designation = Loadable(lazy(() => import('../app/pages/Designation/Designation')));
const Department = Loadable(lazy(() => import('../app/pages/Department/Department')));
const Company = Loadable(lazy(() => import('../app/pages/Company/Company')));
const LeaveType = Loadable(lazy(() => import('../app/pages/LeaveType/LeaveType')));
const Leave = Loadable(lazy(() => import('../app/pages/Leave/Leave')));
const EditEmployee = Loadable(lazy(() => import('../app/pages/Employee/AddEmployee/EditEmployee')));
const EmployeeViewPage = Loadable(lazy(() => import('../app/pages/Employee/EmployeeViewPage/EmployeeViewPage')))

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
    path: "employee/:id",
    id: nanoid(),
    component: <EmployeeViewPage />,
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
];

export default routes;
