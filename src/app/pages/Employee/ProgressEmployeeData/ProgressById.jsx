import React from "react";
import { useParams } from "react-router-dom";
import { useGetEmployeeProgress } from "../../../hooks/employee/useEmployee";
import { LinearProgress, Typography } from "@mui/material";

const ProgressById = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeProgress(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No progress data found</p>;
  }

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

  const calculateProgress = () => {
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

    return progress;
  };

  const progress = calculateProgress();

  return (
    <>
      <h2>Profile Completed</h2>
      <LinearProgress variant="determinate" value={progress} />
      <Typography textAlign={"end"} marginBottom={"1rem"}>
        {progress}% Complete
      </Typography>
    </>
  );
};

export default ProgressById;