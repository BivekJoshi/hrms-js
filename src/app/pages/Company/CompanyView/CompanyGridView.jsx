import React, { useContext, useState } from "react";
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
import NewFilter from "../../../components/NewFilter/NewFilter";

const CompanyGridView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  const { palette } = useContext(ThemeModeContext); // Accessing mode from context

  const [nameFilter, setNameFilter] = useState("");

  const filteredBranch = companyData?.filter((branch) =>
    `${branch.branchName}`?.toLowerCase()?.includes(nameFilter.toLowerCase())
  );
  const handleClearSearch = () => {
    setNameFilter("");
  };
  const filterMenu = [
    {
      label: "Branch Name",
      name: "name",
      type: "employeeSearch",
      md: 4,
      sm: 12,
      value: nameFilter,
      setSearch: handleClearSearch,
      onChange: (e) => setNameFilter(e.target.value),
    },
  ];

  return (
    <>
      <NewFilter inputField={filterMenu} disableSubmit={true} />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          columnGap: "1rem",
          rowGap: "1rem",
        }}
        mt={1}
      >
        {filteredBranch.map((item, index) => (
          <Card key={index}>
            <Box
              sx={{
                backgroundColor: palette.secondary.main,
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
                    {item?.branchName && item.branchName.length > 27
                      ? item.branchName.slice(0, 27) + "..."
                      : item.branchName}
                  </Typography>
                }
                popoverContent={
                  item.branchName.length > 27 ? (
                    <Typography sx={{ p: 1 }}>{item.branchName}</Typography>
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
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {item?.branchAddress && item.branchAddress.length > 30
                  ? item.branchAddress.slice(0, 30) + "..."
                  : item.branchAddress}
              </Typography>
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                {item?.branchContact}{" "}
                <div style={{ color: "blue", textDecoration: "underline" }}>
                  ({item?.branchEmail})
                </div>
              </Typography>
              <br />
              <Typography
                variant="p"
                sx={{
                  textAlign: "center",
                  // minwidth: "350px",
                  height: "80%",
                  overflow: "clip",
                  wordWrap: "break-word",
                }}
              >
                {item?.branchDescription || null}
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
        ))}
      </Grid>
    </>
  );
};

export default CompanyGridView;
