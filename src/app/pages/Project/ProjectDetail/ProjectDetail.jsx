// import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
// import React from "react";
// import { DataGrid } from '@mui/x-data-grid';
// import "../project.css";

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//   ];

//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon' },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
//     { id: 4, lastName: 'Stark', firstName: 'Arya' },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
//     { id: 6, lastName: 'Melisandre', firstName: null },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara' },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini' },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey' },
//   ];

// const ProjectDetail = () => {
//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={8}>
//           <Typography variant="h6" sx={{ width: 200, height: 200 }}>
//             <Card>company Details</Card>
//           </Typography>
//         </Grid>
//         <Grid item xs={4}>
//           <Typography variant="h6">
//             Employee
//           </Typography>
//            <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h6" sx={{ width: 200, height: 200 }}>
//           three
//         </Typography>
//       </Grid>
//     </>
//   );
// };

// export default ProjectDetail;

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import "./style-card.css";
import butterfly from "../../../../assets/butterfly.png";
import { Image } from "@mui/icons-material";

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

const ProjectDetail = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
          }}
        >
          Flex Box
        </Typography>
      </Box>
      <Grid
        container
        item
        gap={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {arr.map((item, index) => (
            <Card key={index} className="icon-style-card">
              <div className="icon-style-inner"></div>
              <div className="butterfly-inner"><img src={butterfly} alt="butteryfly-image" /></div>
              <CardHeader
                sx={{textAlign: "center", display: "flex", justifyContent: "space-around" }}
                
                title="HRMS"
              />
              <CardContent>Lorem ipsum dolor sit amet consectetur.</CardContent>
            </Card>
        ))}
      </Grid>
    </>
  );
};

export default ProjectDetail;
