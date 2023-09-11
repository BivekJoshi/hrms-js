import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../../Style/Style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useGetLoggedInUserLeaveBalance } from "../../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../../hooks/leaveType/useLeaveType";
import { GiFireworkRocket } from "react-icons/gi";
import { MdPregnantWoman, MdOutlineFlightTakeoff } from "react-icons/md";
import {FaBaby} from "react-icons/fa";
import {GiBigDiamondRing} from "react-icons/gi";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: 290,
  maxHeight: 310,
  // padding: 30,
  // margin: 8,
}));

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

  if (isLoading || !leavebalance || !leaveTypeData) {
    return <div>Loading...</div>;
  }

  const leaveIcon = [
    {
      id: 4,
      leaveType: "FESTIVAL ",
      icon: <GiFireworkRocket style={{width:"3rem"}}/>,
    },
    {
      id: 5,
      leaveType: "MATERNITY ",
      icon: <MdPregnantWoman style={{width:"3rem"}}/>,
    },
    {
      id: 3,
      leaveType: "ANNUAL ",
      icon: <MdOutlineFlightTakeoff style={{width:"3rem"}}/>,
    },
    {
      id: 6,
      leaveType: "PATERNITY ",
      icon: <FaBaby style={{width:"2rem"}}/>,
    },
    {
      id: 7,
      leaveType: "MARRIAGE ",
      icon: <GiBigDiamondRing style={{width:"3rem", height:"3rem"}}/>,
    },
    {
      id: 1,
      leaveType: "CASUAL ",
      icon: <KitesurfingIcon style={{width:"3rem", height:"3rem"}}/>,
    },
    {
      id: 8,
      leaveType: "MATERNITY ADDITIONAL ",
      icon: <BabyChangingStationIcon style={{width:"3rem", height:"3rem"}}/>,
    },
  ];
  if (isLoading || !leavebalance || !leaveTypeData) {
    return <div>Loading...</div>;
  }

  const leaveTypeMap = new Map();
  leaveIcon.forEach((leaveType) => {
    leaveTypeMap.set(leaveType.id, leaveType.leaveType);
  });
  const leaveIconMap = new Map();
  leaveIcon.forEach((leaveIcon) => {
    leaveIconMap.set(leaveIcon.id, leaveIcon.icon);
  });

  const boxes = leavebalance.map((data, index) => (
    <Box key={index} boxShadow="7" borderRadius="1.5rem" minHeight="200px" >
        <Typography fontSize="1.2rem" fontWeight="600" marginTop="1rem">
          {leaveTypeMap.get(data?.leaveTypeId)}
        </Typography>
        <Typography variant="h2" color="#3e019b" style={{ marginTop: 25 }}>
          {leaveIconMap.get(data?.leaveTypeId)}

        </Typography>
          <Typography fontSize="1rem">
            <b>Available Leave: {data.leaveBalance}</b>
          </Typography>
          <Typography fontSize="1rem">
            <b>Total Leave: {data.leaveTaken}</b>
          </Typography>
    </Box>
  ));

  const chunkedBoxes = [];
  for (let i = 0; i < boxes.length; i += 5) {
    chunkedBoxes.push(boxes.slice(i, i + 5));
  }

  return (
    <Box sx={{ flexGrow: 1 }} paddingBottom="2rem">
      <h2>Taken Leave</h2>
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
            style={{ padding:" 0 0 1rem", margin: "1rem .5rem" }}
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap="1rem"
            key={index}
            // boxShadow="7"
            // maxWidth="250px"
          >
            {chunk}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ApplyLeave;
