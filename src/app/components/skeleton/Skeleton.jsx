import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const SkeletonComp = () => {
  const gridItems = Array.from({ length: 12 }, (_, index) => (
    <Grid
      item
      key={index}
      xs={12}
      md={6}
      xl={4}
      lg={4}
      sx={{
        border: "1px solid #cbc8c8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack sx={{ display: "flex", flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <Skeleton variant="circular" width={30} height={30} />
        <div style={{display: 'flex', gap:'1rem'}}>
          <Skeleton variant="text" width={60} height={40} />
          <Skeleton variant="text" width={60} height={40} />
        </div>
      </Stack>
      <Skeleton variant="circular" width={70} height={70} />      
      <Skeleton variant="text" width={'60%'} height={40} />
      <Skeleton variant="text" width={'60%'} height={70} />
      <Skeleton  variant="text" width={'90%'} height={140} />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
      }}
    >
      {gridItems}
    </Grid>
  );
};

export default SkeletonComp;
