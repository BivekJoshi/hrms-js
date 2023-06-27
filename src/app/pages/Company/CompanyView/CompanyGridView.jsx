import React from "react";
import { useGetCompany } from "../../../hooks/company/useCompany";
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
// import "../../Project/project.css";
// import butterfly from "../../../../assets/butterfly.png";

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
          <Card key={index} className="icon-style-card">
            <div className="icon-style-inner"></div>
            {/* <div className="butterfly-inner">
            //   <img src={butterfly} alt="butteryfly-image" />
            </div> */}
            <CardHeader
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
              }}
              title={item.companyName}
            />
            <CardContent>
              {item.companyType} <br />
              {item.companyDescription
                ? item.companyDescription.slice(0, 30)
                : null}
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Button size="small" variant="contained">
                Show more
              </Button>
              <Button size="small" variant="contained" onClick={() => handleEditCompany(item)}>
                Edit
              </Button>
              <Button size="small" variant="contained" onClick={() => handleDeleteCompany(item)}>
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