import { Grid, ListItem, ListItemText } from "@mui/material";
import React from "react";

const InfoItem = ({ field, value }) => {
  return (
    <>
      <ListItem className="profileFOntSize">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}>
          <Grid item xs={6}>
            <ListItemText primary={field + " : "} />
          </Grid>
          <Grid item xs={6}>
            <ListItemText primary={value} />
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default InfoItem;
