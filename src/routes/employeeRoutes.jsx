import React, { lazy, useContext } from "react";
import { nanoid } from "nanoid";
import Loadable from "../app/components/Header/Loader/Loadable";

const EmployeeDashboard = Loadable(
  lazy(() =>
    import("../app/pages/EmployeePage/EmployeeDashboard/EmployeeDashbord")
  )
);

const employeeRoutes = [
  {
    path: "dashboard",
    name: "Employee Dashboard",
    id: nanoid(),
    component: <EmployeeDashboard />,
  },
];

export { employeeRoutes };