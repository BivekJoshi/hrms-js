import React from "react";
import { useGetCompany } from "../../../hooks/company/useCompany";
import { TabScrollButton } from '@mui/material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

const CompanyGridView = ({ companyData, isLoading, handleEditCompany, handleDeleteCompany }) => {

  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
          }}
        >
          Company List
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
        {companyData.map((item, index) => (
          <Card key={index}>
            <CardHeader
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
              }}
              title={item.companyName}
            />
            <CardContent sx={{display: "flex", flexDirection: "column", gap: "1rem", overflow: "auto", height: "6rem"}}>
              <Typography variant="h5">{item?.companyType || null}</Typography>
              <Typography variant="p">{item?.companyDescription || null}</Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "0.4rem"
              }}
            >
              <Button variant="contained" color="primary" onClick={() => handleEditCompany(item)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteCompany(item)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
        
      </Grid>
    </>
  );
};

export default CompanyGridView;