import React from "react";
import { styled } from "@mui/material/styles";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function CustomBreadcrumb ({currentPath}) {
  <Breadcrumbs aria-label="breadcrumb">
    <Link underline="hover" color="inherit" to="/admin/dashboard">
      HRMS
    </Link>
    <Link
      underline="hover"
      color="inherit"
    >
      <Typography color="text.primary">{currentPath}</Typography>
    </Link>
    
  </Breadcrumbs>;
};