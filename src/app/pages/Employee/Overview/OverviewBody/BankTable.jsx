import React from "react";
import {
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InfoItem = ({ field, value }) => {
  return (
    <>
      <ListItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ListItemText primary={field + " : "} />
          </Grid>
          <Grid item xs={6}>
            <ListItemText primary={value} />
          </Grid>
          <Divider component="li" />
        </Grid>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

const BankTable = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        className="editBasicInfoBtn"
        variant="contained"
        onClick={openModal}
        sx={{ bgcolor: "#1c7ed6" }}
      >
        <EditIcon />
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Basic Info Details
          </Typography>
          <Typography sx={{ mt: 2 }}>Here is the edited Details</Typography>
        </Box>
      </Modal>

      {Object.keys(data).map((item) => (
        <InfoItem field={item} value={data[item]} key={item} />
      ))}
    </>
  );
};
export default BankTable;
