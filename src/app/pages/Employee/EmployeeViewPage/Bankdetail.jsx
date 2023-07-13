import React from "react";
import BankTable from "./BankTable";
import {
  Box,
  Button,
  CardHeader,
  List,
  Modal,
  Typography,
} from "@mui/material";
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

const EMPLOYEE = {
  Gender: "MALE",
  CitizenshipNumber: "157-451235",
  PANNumber: "451235",
  DateofBirth: "1990-06-15",
  MobileNumber: "9865675434",
  Email: "dhirajraj78@gmail.com",
  Address: "Baluwatar, Kathmandu",
  MaritalStatus: "Married",
  DateofJoin: "2022-01-06",
  Position: "Paid-Intern",
  Department: "Technical",
};

const FAMILYMEMBERS = {
  Name: "Dinesh Raj Joshi",
  Relation: "Father",
  ContactNumber: "9851242365",
};

const Bankdetail = () => {
  return (
    <>
      <CardHeader title="Basic Info" />

      <List className="BasicInfoList" sx={{ bgcolor: "background.paper" }}>
        <BankTable data={EMPLOYEE} />
        <CardHeader title="Family Info" />
        <BankTable title="Family Member Info" data={FAMILYMEMBERS} />
      </List>
    </>
  );
};

export default Bankdetail;

// import React from "react";
// import BankTable from "./BankTable";
// import {
//   Box,
//   Button,
//   CardHeader,
//   List,
//   Modal,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// // const employee = {
// //   bankname: "Ncc",
// //   BankAccount: "59595151546",
// //   PanNo: "654646",
// // };
// // const family = {
// //   name: "hshaj",
// //   address: "dhsbuy",
// // };
// const style = {
//   position: "absolute",

//   top: "50%",

//   left: "50%",

//   transform: "translate(-50%, -50%)",

//   width: 400,

//   bgcolor: "background.paper",

//   border: "2px solid #000",

//   boxShadow: 24,

//   p: 4,
// };

// const EMPLOYEE = {
//   Gender: "MALE",

//   CitizenshipNumber: "157-451235",

//   PANNumber: "451235",

//   DateofBirth: "1990-06-15",

//   MobileNumber: "9865675434",

//   Email: "dhirajraj78@gmail.com",

//   Address: "Baluwatar, Kathmandu",

//   MaritalStatus: "Married",

//   DateofJoin: "2022-01-06",

//   Position: "Paid-Intern",

//   Department: "Technical",
// };

// const FAMILYMEMBERS = {
//   Name: "Dinesh Raj Joshi",

//   Relation: "Father",

//   ContactNumber: "9851242365",
// };
// const Bankdetail = () => {
//   const [open, setOpen] = React.useState(false);

//   const openModal = () => setOpen(true);

//   const handleClose = () => setOpen(false);
//   return (
//     <>
//       <CardHeader title="Basic Info" />

//       <List
//         className="BasicInfoList"
//         sx={{
//           bgcolor: "background.paper",
//         }}
//       >
//         <Button
//           className="editBasicInfoBtn"
//           variant="contained"
//           onClick={openModal}
//           sx={{
//             bgcolor: "#1c7ed6",
//           }}
//         >
//           <EditIcon />
//         </Button>

//         <Modal open={open} onClose={handleClose}>
//           <Box sx={style}>
//             <Typography variant="h6" component="h2">
//               Edit Basic Info Details
//             </Typography>

//             <Typography sx={{ mt: 2 }}>Here is the edited Details</Typography>
//           </Box>
//         </Modal>

//         {/* {JSON.stringify(Object.keys(EMPLOYEE))} */}
//         <BankTable data={EMPLOYEE} />
//         <BankTable data={FAMILYMEMBERS} />
//       </List>

//       {/* Family Details */}
//     </>
//   );
// };

// export default Bankdetail;

// // import {
// //   Button,
// //   CardHeader,
// //   Grid,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Box,
// //   Typography,
// //   Modal,
// //   Divider,
// // } from "@mui/material";

// // import EditIcon from "@mui/icons-material/Edit";

// // import "../OverviewStyles/BasicInfoTab.css";

// // import ListItemsComponents from "../Components/ListItemsComponents";
// // import BankTable from "./BankTable";

// // const style = {
// //   position: "absolute",

// //   top: "50%",

// //   left: "50%",

// //   transform: "translate(-50%, -50%)",

// //   width: 400,

// //   bgcolor: "background.paper",

// //   border: "2px solid #000",

// //   boxShadow: 24,

// //   p: 4,
// // };

// // const EMPLOYEE = {
// //   Gender: "MALE",

// //   CitizenshipNumber: "157-451235",

// //   PANNumber: "451235",

// //   DateofBirth: "1990-06-15",

// //   MobileNumber: "9865675434",

// //   Email: "dhirajraj78@gmail.com",

// //   Address: "Baluwatar, Kathmandu",

// //   MaritalStatus: "Married",

// //   DateofJoin: "2022-01-06",

// //   Position: "Paid-Intern",

// //   Department: "Technical",
// // };

// // const FAMILYMEMBERS = {
// //   Name: "Dinesh Raj Joshi",

// //   Relation: "Father",

// //   ContactNumber: "9851242365",
// // };

// // const Bankdetail = () => {
// //   const [open, setOpen] = React.useState(false);

// //   const openModal = () => setOpen(true);

// //   const handleClose = () => setOpen(false);

// //   return (
// //     <>
// //       <CardHeader title="Basic Info" />

// //       <List
// //         className="BasicInfoList"
// //         sx={{
// //           bgcolor: "background.paper",
// //         }}
// //       >
// //         <Button
// //           className="editBasicInfoBtn"
// //           variant="contained"
// //           onClick={openModal}
// //           sx={{
// //             bgcolor: "#1c7ed6",
// //           }}
// //         >
// //           <EditIcon />
// //         </Button>

// //         <Modal open={open} onClose={handleClose}>
// //           <Box sx={style}>
// //             <Typography variant="h6" component="h2">
// //               Edit Basic Info Details
// //             </Typography>

// //             <Typography sx={{ mt: 2 }}>Here is the edited Details</Typography>
// //           </Box>
// //         </Modal>

// //         {/* {JSON.stringify(Object.keys(EMPLOYEE))} */}
// //         <BankTable data={EMPLOYEE} />
// //         <BankTable data={FAMILYMEMBERS} />
// //       </List>

// //       {/* Family Details */}
// //     </>
// //   );
// // };

// // export default Bankdetail;
