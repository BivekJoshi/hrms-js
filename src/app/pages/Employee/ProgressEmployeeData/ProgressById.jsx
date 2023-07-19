import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployeeProgress } from "../../../hooks/employee/useEmployee";
import { LinearProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { setProgressId } from "../../../../Redux/progressSlice";

const ProgressById = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeProgress(id);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && data) {
      const {
        bankSet,
        companySet,
        departmentSet,
        familySet,
        addressSet,
        positionSet,
        employmentHistoryAdded,
        qualificationAdded,
      } = data;
      const filledItems = [
        bankSet,
        companySet,
        departmentSet,
        familySet,
        addressSet,
        positionSet,
        employmentHistoryAdded,
        qualificationAdded,
      ].filter((item) => item).length;

      const progress = (filledItems / 8) * 100;

      // dispatch(setProgressData(progress));
      // dispatch(setProgressId(progress));
    }
  }, [progress, id, isLoading, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No progress data found</p>;
  }

  // const progress = useSelector((state) => state.progress);

  return (
    <div>
      <h2>Progress</h2>
      <LinearProgress variant="determinate" value={progress} />
      <p>{progress}% Complete</p>
    </div>
  );
};

export default ProgressById;
