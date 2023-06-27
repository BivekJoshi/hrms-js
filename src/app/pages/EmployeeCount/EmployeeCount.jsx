import MaterialTable from "@material-table/core";
import React from "react";

const EmployeeCount = () => {
  const data = [
    {
      title: "Total Employee",
      Number: "100",
    },
    {
      title: "Male Employee",
      Number: "50 ",
    },
    {
      title: "Female Employee",
      Number: "40 ",
    },
    {
      title: "New Employee",
      Number: "10",
    },
  ];

  return (
    <div>
      <MaterialTable
        title="Employees"
        columns={[
          { title: "Employees", field: "title" },
          { title: "Number of Employee", field: "Number" },
        ]}
        data={data}
      />
    </div>
  );
};

export default EmployeeCount;
