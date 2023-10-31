import {
  Chip,
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
import { useNavigate } from "react-router-dom";

export const PendingTask = () => {
  const navigate = useNavigate();
  let snCounter = 1;
  const { data: pendingTask, isLoading: loadingpendingTask } =
    useGetTaskLoggedInUser();
  const { data: ProjectName, isLoading: lodingprojectName } = useGetProject();

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
            <TableCell sx={{ fontSize: ".75rem" }}>SN</TableCell>
            <TableCell align="right" sx={{ fontSize: ".75rem" }}>
              Task
            </TableCell>
            <TableCell align="right" sx={{ fontSize: ".75rem" }}>
              Project
            </TableCell>
            <TableCell align="right" sx={{ fontSize: ".75rem" }}>
              Priority
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingTask
            ? pendingTask?.slice(0, 4)?.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: ".75rem" }}
                  >
                    {snCounter++}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: ".75rem" }}>
                    {row?.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: ".75rem" }}>
                    {getProjectNameByProjId(row?.projId)}
                  </TableCell>

                  <TableCell align="right">
                    {row?.priority === "HIGH" ? (
                      <Chip
                        label={row?.priority}
                        sx={{
                          bgcolor: "red",
                          fontSize: ".7rem",
                          height: "22px",
                        }}
                      />
                    ) : row?.priority === "MEDIUM" ? (
                      <Chip
                        label={row?.priority}
                        sx={{
                          bgcolor: "yellow",
                          fontSize: ".7rem",
                          height: "22px",
                        }}
                      />
                    ) : (
                      <Chip
                        label={row?.priority}
                        sx={{
                          bgcolor: "green",
                          fontSize: ".7rem",
                          height: "22px",
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            : ""}
          <TableRow sx={{ marginTop: "1rem" }}>
            <TableCell
              colSpan={4}
              style={{
                cursor: "pointer",
                fontWeight: "800",
                textAlign: "center",
                fontSize: ".75rem",
              }}
              onClick={() => navigate(`/employee/project`)}
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
