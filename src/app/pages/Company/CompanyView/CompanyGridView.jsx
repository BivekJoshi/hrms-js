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
      <Grid
        container
        item
        gap={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        }}
      >
        {companyData.map((item, index) => (
          <Card key={index} sx={{border: "2px solid gray"}}>
            <CardHeader
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
              }}
              title={item?.companyName}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "1rem", minHeight: "12rem" }}>
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

              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteCompany(item)}
                  sx={{ mt: 3, ml: 1 }}
                  color="error"
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleEditCompany(item)}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Edit
                </Button>
              </Grid>
            </CardActions>
          </Card>
        ))}

      </Grid>
    </>
  );
};

export default CompanyGridView;