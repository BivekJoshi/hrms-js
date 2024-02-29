import React from "react";
import { useGetWorkShiftDefault } from "../../../../../hooks/employee/AddEmployeeWorkShift/useWorkShift";

const WorkShift = () => {
  //   const { data: workShiftData  } = useGetWorkShiftDefault();
  const { data: workShiftData } = useGetWorkShiftDefault();
  console.log("values", workShiftData);
  return <div>WorkShift</div>;
};

export default WorkShift;
