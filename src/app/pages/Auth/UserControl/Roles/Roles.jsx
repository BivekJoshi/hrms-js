// import React from "react";
// import { useGetRole } from "../../../../hooks/auth/roles/useRole";
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const Roles = () => {
//   const { data: roleData, isLoading } = useGetRole();

//   const [expanded, setExpanded] = React.useState(null);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : null);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1rem",
//           marginY: "1rem",
//         }}
//       >
//         {roleData &&
//           roleData.map((role, index) => {
//             const panelId = `panel${index + 1}`;
//             return (
//               <div key={index}>
//                 <Accordion
//                   expanded={expanded === panelId}
//                   onChange={handleChange(panelId)}
//                 >
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls={`${panelId}-content`}
//                     id={`${panelId}-header`}
//                   >
//                     <Typography sx={{ width: "33%", flexShrink: 0 }}>
//                       {role.name
//                         .replace("ROLE_", "")
//                         .toLowerCase()
//                         .replace(/^\w/, (c) => c.toUpperCase())
//                         .replace(/_/g, " ")}
//                     </Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography>
//                       {role?.description}
//                     </Typography>
//                   </AccordionDetails>
//                 </Accordion>
//               </div>
//             );
//           })}
//       </Box>
//     </>
//   );
// };

// export default Roles;

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(role, su, ad, mg, had, hcr, emp) {
  return { role, su, ad, mg, had, hcr, emp };
}

const rows = [
  createData("System Setup", "Yes", "No", "No", "No", "No", "No"),
  createData("Role Assign", "Yes", "Yes", "No", "No", "No", "No"),
  createData("Create User", "Yes", "Yes", "Yes", "Yes", "No", "No"),
  createData("Add Employee Information", "Yes", "Yes", "No", "No", "No", "No"),
  createData("Terminate Employee", "Yes", "Yes", "Yes", "Yes", "No", "No"),
  createData(
    "View Employee Information",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Yes *"
  ),
  createData(
    "Employee Mapping With Device",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "No"
  ),
  createData("View Holiday", "Yes", "Yes", "Yes", "Yes", "Yes", "No"),
  createData("Add Holiday", "Yes", "Yes", "Yes", "Yes", "No", "No"),
  createData("Delete Holiday", "Yes", "Yes", "Yes", "No", "No", "No"),
  createData("View Events", "Yes", "Yes", "Yes", "Yes", "Yes", "No"),
  createData("Add Event", "Yes", "Yes", "Yes", "Yes", "No", "No"),
  createData("Apply Leave", "No", "Yes", "Yes", "Yes", "Yes", "No"),
  createData("Approve Leave", "Yes", "No", "Yes", "Yes", "No", "No"),
  createData("Create project", "Yes", "Yes", "Yes", "No", "No", "No"),
  createData(
    "View Attendance Report",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Yes *"
  ),
  createData(
    "Logistic add and Disverse",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "No"
  ),
  createData("To Do List", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"),
  createData("Email Log", "Yes", "Yes", "Yes", "Yes", "No", "No"),
];

export default function Roles() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tasks\Roles</TableCell>
              <TableCell>Super User</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>HR Admin</TableCell>
              <TableCell>HR Clerk</TableCell>
              <TableCell>Employee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.role}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.role}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.su}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row.ad}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row.mg}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row.had}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row.hcr}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row.emp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="p">* View own information only</Typography>
    </>
  );
}
