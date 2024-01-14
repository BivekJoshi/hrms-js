import React, { useContext } from "react";

import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Divider, Typography } from "@mui/material";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import NewEmployeeQualificationDetailForm from "../../../../../components/Form/Employee/EmployeeQualificationDetailForm/NewEmployeeQualificationDetailForm";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";

const primaryColor = "#1c7ed6";
const AcademicsComponents = ({ data, isLoading }) => {
  const auth = useAuth();

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    // {
    //   title: "Passed Level",
    //   field: "passedLevel",
    //   render: (rowData) => {
    //     const passedName = level?.find((name) => {
    //       const fullName = name?.passedValue === rowData?.passedLabel
    //       console.log({"name?.passedValue": name?.passedValue, "rowData?.passedLabel": rowData})
    //     });

    //     return passedName || '-';
    //   },
    //   width: "20vh",
    //   sorting: false,
    // },

    {
      title: "Passed Level",
      field: "passedLevel",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Board",
      field: "board",
      render: (rowData) => {
        const board = rowData?.board;
        return board.toUpperCase();
      },
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Institute",
      field: "institute",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Grade",
      field: "grade",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Passed Year",
      field: "passedYear",
      emptyValue: "-",
      sorting: false,
    },
  ].filter(Boolean);

  return (
    <>
      {/* <Box bgcolor={mode === "light" ? "" : "#414141"}>
        <Divider>{data.passedLevel}</Divider>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              style={{
                color: primaryColor,
                fontWeight: "bolder",
                fontSize: "larger",
              }}
            >
              {data.institute}
            </Typography>
            <Typography style={{ fontWeight: "bolder", fontSize: "larger" }}>
              {data.board}
            </Typography>
            <Typography style={{ fontSize: "15px" }}>{data.grade}</Typography>
            <Typography style={{ fontSize: "13px" }}>
              {data.passedYear}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Box> */}
      <NewEmployeeQualificationDetailForm employeId={auth?.userId} />
    </>
  );
};

export default AcademicsComponents;
