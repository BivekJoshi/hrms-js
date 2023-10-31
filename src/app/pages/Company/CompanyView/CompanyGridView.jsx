import React from "react";
import { useGetCompany } from "../../../hooks/company/useCompany";
import { TabScrollButton } from "@mui/material";
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
import HocButton from "../../../hoc/hocButton";

const CompanyGridView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
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
          <Card
            dis
            key={index}
            sx={{
              border: "1px solid black",
              borderRadius: "1rem",
              padding: "1rem",
              textAlignLast: "center",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1rem",
            }}
          >
            <CardHeader
              sx={{
                fontSize: "1.4rem",
                fontWeight: "600",
                padding: "0",
              }}
              title={item?.companyName}
            />
            <Typography fontSize="1.2rem" fontWeight="600">
              {item?.companyType || null}
            </Typography>
            <Typography fontSize="1rem">
              {item?.companyDescription || null}
            </Typography>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "0.4rem",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <HocButton
                  permissions={permissions?.canDelete}
                  variant={"outlined"}
                  onClick={() => handleDeleteCompany(item)}
                  sx={{ mt: 3, ml: 1 }}
                  color={"white"}
                  bg={"#d32f2f"}
                  buttonName={"Delete"}
                  hoverBg={"#f20a0a"}
                />
                <HocButton
                  permissions={permissions?.canEdit}
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => handleEditCompany(item)}
                  sx={{ mt: 3, ml: 1 }}
                  buttonName={"Edit"}
                />
              </Grid>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default CompanyGridView;
