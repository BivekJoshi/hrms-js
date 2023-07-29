// import React from "react";
// import { Button, List, ListItem, Stack, Typography } from "@mui/material";

// const ProfileDetailCard = ({ data }) => {
//   console.log(data);
//   const hrStyle = {
//     border: "2px dashed #a96e3b",
//     margin: "12px 0px",
//   };

//   return (
//     <Stack
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-around",
//         padding: "1rem 3rem",
//         gap: "4rem",
//         border: "1px solid #fc6075",
//       }}
//     >
//       <Stack sx={{ width: "300px", height: "300px" }}>
//         <img
//           src="https://smarthr.dreamguystech.com/materialize/template/assets/img/profiles/avatar-02.jpg"
//           alt="image"
//         />
//       </Stack>
//       <hr style={hrStyle} />
//       <Stack sx={{ display: "flex", flexDirection: "column" }}>
//         <List>
//           <ListItem  sx={{ display: "flex", alignItems: "center", gap: "4rem", }}>
//             <Typography variant="h5"  sx={{
//                 flex: "30%",
//               }}>Employee Id:</Typography>
//             <Typography variant="p"  sx={{
//                 flex: "70%",
//               }}>{data?.id}</Typography>
//           </ListItem>
//           <ListItem sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
//             <Typography variant="h5">Name:</Typography>
//             <Typography variant="p">{data?.name}</Typography>
//           </ListItem>
//           <ListItem sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
//             <Typography variant="h5">Contact Number:</Typography>
//             <Typography variant="p">{data?.mobileNo}</Typography>
//           </ListItem>
//           <ListItem sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
//             <Typography variant="h5">Address:</Typography>
//             <Typography variant="p">{data?.address}</Typography>
//           </ListItem>
//         </List>
//         <Button
//           variant="h5"
//           sx={{
//             width: "fit-content",
//             marginTop: "12px",
//             borderRadius: "12px",
//             lineHeight: "1.5rem",
//             background: "linear-gradient(to right, #ff9b44 0%, #fc6075 100%)",
//             color: "#ffffff",
//             border: "1px solid #ff9b44",
//             color: "#fff",
//             fontSize: "1rem",
//             fontWeight: "400",
//             padding: "2px 12px",
//           }}
//         >
//           Send Message
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };

// export default ProfileDetailCard;



import React from "react";
import { Button, List, ListItem, Stack, Typography } from "@mui/material";

// Styled component for ListItem typography
const ListItemTypography = ({ variant, label, value }) => (
  <ListItem sx={{ display: "flex", gridGap: "4rem" }}>
    <Typography variant={variant} sx={{ flex: "50%" }}>
      {label}
    </Typography>
    <Typography variant="p" sx={{ flex: "50%" }}>
      {value}
    </Typography>
  </ListItem>
);

const ProfileDetailCard = ({ data }) => {
  console.log(data);
  const hrStyle = {
    border: "1px dashed rgb(101 90 82);",
    margin: "12px 0px",
  };

  return (
    <Stack
      sx={{
        width: "600px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "1rem 3rem",
        gap: "1rem",
        border: "1px solid #fc6075",
      }}
    >
      <Stack sx={{ width: "250px", height: "250px" }}>
        <img
          src="https://smarthr.dreamguystech.com/materialize/template/assets/img/profiles/avatar-02.jpg"
          alt="image"
        />
      </Stack>
      <hr style={hrStyle} />
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <List>
          <ListItemTypography variant="h6" label="Employee Id:" value={data?.id} />
          <ListItemTypography variant="h6" label="Name:" value={data?.name} />
          <ListItemTypography variant="h6" label="Contact Number:" value={data?.mobileNo} />
          <ListItemTypography variant="h6" label="Address:" value={data?.address} />
        </List>
        <Button
          variant="h5"
          sx={{
            width: "fit-content",
            marginTop: "12px",
            borderRadius: "12px",
            lineHeight: "1.5rem",
            background: "linear-gradient(to right, #ff9b44 0%, #fc6075 100%)",
            color: "#ffffff",
            border: "1px solid #ff9b44",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "400",
            padding: "2px 12px",
          }}
        >
          Send Message
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfileDetailCard;