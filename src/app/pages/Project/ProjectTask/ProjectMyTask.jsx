// import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";
// import React from "react";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import Male from "../../../../assets/male.png";

// export default function ProjectMyTask({taskData}) {
//   return (
//     <Box padding="2rem 0 0 0">
//       <h4 style={{ fontWeight: "800" }}>My Task</h4>
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
//         gap="1rem"
//         padding="1rem 0"
//       >
//         {taskData.map((data, index) => (
//           <Box
//             bgcolor="#ededed66"
//             padding="1rem"
//             boxShadow="5"
//             borderRadius=".5rem"
//           >
//             <Box
//               display="flex"
//               flexDirection="row"
//               justifyContent="space-between"
//             >
//               <Typography
//                 fontSize="1rem"
//                 fontWeight="600"
//                 width="80%"
//                 padding=".5rem 0"
//               >
//                 <Chip
//                   sx={{
//                     fontSize: ".9rem",
//                     width: "80%",
//                     bgcolor: "#ededed66",
//                   }}
//                   label={
//                     <h4
//                       style={{
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         marginLeft: "-.5rem",
//                         color: "#01579b",
//                       }}
//                     >
//                       {data?.name}
//                     </h4>
//                   }
//                 />
//               </Typography>
//               <Chip
//                 label={data.priority}
//                 sx={{ fontSize: ".7rem", height: "18px" }}
//               />
//             </Box>
//             <Typography fontSize=".8rem">{data.detail}</Typography>

//             <Divider />
//             <Stack
//               marginTop=".5rem"
//               flexDirection="row"
//               justifyContent="space-between"
//             >
//               <Chip
//                 label={data.dueDate}
//                 variant="outlined"
//                 icon={<QuestionAnswerIcon sx={{ width: ".7rem" }} />}
//                 sx={{ height: "20px" }}
//               />
//               <Chip
//                 sx={{ bgcolor: "#ededed66", height: "20px" }}
//                 avatar={<Avatar alt="Natacha" src={Male} />}
//               />
//             </Stack>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

import React from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Typography } from "@mui/material";

const columns = [
  {
    title: "SN",
    render: (rowData) => rowData.tableData.id + 1,
    width: "1%",
    sortable: false,
    sorting: false,
  },
  {
    title: "Task",
    field: "name",
    emptyValue: "-",
    width: 200,
    sorting: false,
  },
  {
    title: "Detail",
    field: "detail",
    emptyValue: "-",
    width: 200,
    sorting: false,
  },
  {
    title: "Priority",
    field: "priority",
    emptyValue: "-",
    width: 200,
    sorting: false,
  },
  {
    title: "Due Date",
    field: "dueDate",
    emptyValue: "-",
    width: 200,
    sorting: false,
  },
].filter(Boolean);

const ProjectMyTask = ({ taskData }) => {
  return taskData ? (
    <CustomTable columns={columns} data={taskData} title="My Task" />
  ) : (
    <Typography textAlign="center">Task is not assign</Typography>
  );
};

export default ProjectMyTask;
