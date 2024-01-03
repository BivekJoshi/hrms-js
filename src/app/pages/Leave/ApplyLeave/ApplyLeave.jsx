import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "../../Style/Style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useGetLoggedInUserLeaveBalance } from "../../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../../hooks/leaveType/useLeaveType";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

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

  const boxes =
    leavebalance &&
    leavebalance.map((data, index) => (
      <Box
        key={index}
        boxShadow="7"
        borderRadius="1.5rem"
        padding="1rem"
        bgcolor={mode === "light" ? "" : "#4f4e4c"}
        borderLeft="4px solid #388E3C"
      >
        <Typography fontSize="16px">
          <b>{data ? data?.leaveName : ""}</b>
        </Typography>
        <Typography fontSize="14px">
          Leave Taken: {data ? data.leaveTaken : ""}
        </Typography>
        <Typography fontSize="14px" fontWeight={500}>
          Available Leave: {data ? data.leaveBalance : ""}
        </Typography>
      </Box>
    ));
  const chunkedBoxes = [];
  for (let i = 0; i < boxes.length; i += 4) {
    chunkedBoxes.push(boxes.slice(i, i + 4));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5">Taken Leave</Typography>
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
            gridTemplateColumns="repeat(auto-fit, minmax(125px, 1fr))"
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
