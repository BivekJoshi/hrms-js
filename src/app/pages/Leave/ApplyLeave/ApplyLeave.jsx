import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../../Style/Style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useGetLoggedInUserLeaveBalance } from "../../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../../hooks/leaveType/useLeaveType";
import { GiFireworkRocket } from "react-icons/gi";
import { MdPregnantWoman, MdOutlineFlightTakeoff } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   minHeight: 290,
//   maxHeight: 310,
//   // padding: 30,
//   // margin: 8,
// }));
const CustomArrow = ({ onClick, direction }) => {
  const arrowStyles = {
    fontSize: 30,
    cursor: "pointer",
    zIndex: 2,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "black",
    padding: 0,
  };

  const arrowIcon = direction === "prev" ? "<" : ">";

  return (
    <div
      style={{ ...arrowStyles, [direction === "prev" ? "left" : "right"]: 1 }}
      onClick={onClick}
    >
      {arrowIcon}
    </div>
  );
};

const ApplyLeave = () => {
  const { data: leavebalance, isLoading } = useGetLoggedInUserLeaveBalance();
  const { data: leaveTypeData } = useGetLeaveType();
  const { mode } = useContext(ThemeModeContext);

  if (isLoading || !leavebalance || !leaveTypeData) {
    return <div>Loading...</div>;
  }

  const leaveIcon = [
    {
      id: 1,
      leaveType: "SICK ",
      icon: (
        <BabyChangingStationIcon
          style={{
            width: "3rem",
            height: "3rem",
            color: mode === "light" ? "#6DAB23" : "white",
          }}
        />
      ),
    },
    {
      id: 2,
      leaveType: "ANNUAL ",
      icon: (
        <MdOutlineFlightTakeoff
          style={{
            width: "3rem",
            color: mode === "light" ? "#6DAB23" : "white",
          }}
        />
      ),
    },
    {
      id: 3,
      leaveType: "MATERNITY ",
      icon: (
        <MdPregnantWoman
          style={{
            width: "3rem",
            color: mode === "light" ? "#6DAB23" : "white",
          }}
        />
      ),
    },

    {
      id: 4,
      leaveType: "PATERNITY ",
      icon: (
        <FaBaby
          style={{
            width: "2rem",
            color: mode === "light" ? "#6DAB23" : "white",
          }}
        />
      ),
    },
    {
      id: 5,
      leaveType: "UNPAID ",
      icon: (
        <KitesurfingIcon
          style={{
            width: "3rem",
            height: "3rem",
            color: mode === "light" ? "#6DAB23" : "white",
          }}
        />
      ),
    },
  ];
  // if (isLoading || !leavebalance || !leaveTypeData) {
  //   return <div>Loading...</div>;
  // }

  const leaveTypeMap = new Map();
  leaveIcon.forEach((leaveType) => {
    leaveTypeMap.set(leaveType.id, leaveType.leaveType);
  });
  const leaveIconMap = new Map();
  leaveIcon.forEach((leaveIcon) => {
    leaveIconMap.set(leaveIcon.id, leaveIcon.icon);
  });

  const boxes = leavebalance
    ? leavebalance.map((data, index) => (
        <Box
          key={index}
          boxShadow="7"
          borderRadius="1.5rem"
          minHeight="200px"
          bgcolor={mode === "light" ? "" : "#4f4e4c"}
        >
          <Typography variant="h6" marginTop="1rem">
            {leaveTypeMap.get(data ? data?.leaveTypeId : "")}
          </Typography>
          <Typography variant="h2" color="#3e019b" style={{ marginTop: 25 }}>
            {leaveIconMap.get(data ? data?.leaveTypeId : "")}
          </Typography>
          <Typography fontSize="1rem">
            <b>Available Leave: {data ? data.leaveBalance : ""}</b>
          </Typography>
          <Typography fontSize="1rem">
            <b>Total Leave: {data ? data.leaveTaken : ""}</b>
          </Typography>
        </Box>
      ))
    : leaveIcon.map((leave, index) => (
        <Box
          key={index}
          boxShadow="7"
          borderRadius="1.5rem"
          minHeight="200px"
          bgcolor={mode === "light" ? "" : "#4f4e4c"}
        >
          <Typography variant="h6" marginTop="1rem">
            {leave.leaveType}
          </Typography>
          <Typography variant="h2" color="#3e019b" style={{ marginTop: 25 }}>
            {leave.icon}
          </Typography>
          <Typography fontSize="1rem">
            <b>Available Leave: 0</b>
          </Typography>
          <Typography fontSize="1rem">
            <b>Total Leave: 0</b>
          </Typography>
        </Box>
      ));

  const chunkedBoxes = [];
  for (let i = 0; i < boxes.length; i += 5) {
    chunkedBoxes.push(boxes.slice(i, i + 5));
  }

  return (
    <Box sx={{ flexGrow: 1 }} paddingBottom="2rem">
      <Typography variant="h4">Taken Leave</Typography>
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler) => (
          <CustomArrow onClick={onClickHandler} direction="prev" />
        )}
        renderArrowNext={(onClickHandler) => (
          <CustomArrow onClick={onClickHandler} direction="next" />
        )}
      >
        {chunkedBoxes.map((chunk, index) => (
          <Box
            style={{ padding: " 0 0 1rem", margin: "1rem .5rem" }}
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(0, 1fr))"
            gap="1rem"
            key={index}
          >
            {chunk}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ApplyLeave;
