import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useGetTaskLoggedInUser } from "../../../hooks/project/ProjectTask/useProjectTask";
import { useGetProject } from "../../../hooks/project/useProject";

export const PendingTask = () => {
  let snCounter = 1;
  const { data: pendingTask ,isLoading:loadingpendingTask} = useGetTaskLoggedInUser();
  const { data: ProjectName ,isLoading:lodingprojectName} = useGetProject();

  const getProjectNameByProjId = (projId) => {
    const project = ProjectName?.find((p) => p?.id === projId);
    return project ? project?.projectName : "Unknown";
  };

  return (
    // !loadingpendingTask || !lodingprojectName&&(
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell align="right">Task</TableCell>
            <TableCell align="right">Project</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingTask?.slice(0, 7)?.map((row) => (
            <TableRow key={row?.id}>
              <TableCell component="th" scope="row">
                {snCounter++}
              </TableCell>
              <TableCell align="right">{row?.name}</TableCell>
              <TableCell align="right">
                {getProjectNameByProjId(row?.projId)}
              </TableCell>
              <TableCell align="right">{row?.priority}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              colSpan={4}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              CLICK HERE TO SHOW ALL TASK
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    // )

  );
};
