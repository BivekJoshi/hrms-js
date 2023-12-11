import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import CompanyGrid from "../../../../assets/companyGrid.png";
import PopOver from "../../../../theme/overrides/PopOver";

const CompanyGridView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  const { palette } = useContext(ThemeModeContext); // Accessing mode from context

  return (
    <>
      <Grid container spacing={2}>
        {companyData.map((item, index) => (
          <Grid item xs={4} sx={{ minWidth: "400px" }}>
            <Card>
              <Box
                sx={{
                  backgroundColor: palette?.primary?.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={CompanyGrid}
                  style={{ position: "absolute", right: 0 }}
                />

                <PopOver
                  triggerContent={
                    <Typography
                      variant="h5"
                      sx={{ color: "#fff", fontWeight: "700", padding: "15px" }}
                    >
                      {item?.companyName && item.companyName.length > 27
                        ? item.companyName.slice(0, 27) + "..."
                        : item.companyName}
                    </Typography>
                  }
                  popoverContent={
                    item.companyName.length > 27 ? (
                      <Typography sx={{ p: 1 }}>{item.companyName}</Typography>
                    ) : (
                      ""
                    )
                  }
                />
              </Box>
              <CardContent
                sx={{
                  height: "290px",
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <PopOver
                  triggerContent={
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {item?.companyType && item.companyType.length > 30
                        ? item.companyType.slice(0, 30) + "..."
                        : item.companyType}
                    </Typography>
                  }
                  popoverContent={
                    item.companyType.length > 30 ? (
                      <Typography sx={{ p: 1 }}>{item.companyType}</Typography>
                    ) : (
                      ""
                    )
                  }
                />
                <br />
                <Typography variant="p" sx={{ textAlign: "center" }}>
                  {item?.companyDescription || null}
                </Typography>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: ".8rem",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleEditCompany(item)}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleDeleteCompany(item)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CompanyGridView;
