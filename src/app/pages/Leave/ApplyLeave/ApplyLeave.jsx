import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AirlineSeatFlatOutlinedIcon from "@mui/icons-material/AirlineSeatFlatOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: 290,
  maxHeight: 290,
  // padding: 10,
  margin: 8,
  // minWidth: 132,
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
      style={{ ...arrowStyles, [direction === "prev" ? "left" : "right"]: 10 }}
      onClick={onClick}
    >
      {arrowIcon}
    </div>
  );
};

const ApplyLeave = () => {
  const boxes = Array.from({ length: 10 }, (_, index) => (
    <div key={index} >
      <Item >
        <Typography variant="h5"><b>Annual Leave</b></Typography>
        <Typography variant="h2" color="#3e019b" style={{ marginTop: 25 }}>
          <AirlineSeatFlatOutlinedIcon fontSize="300px" />
        </Typography>
        <div style={{ marginTop: 45 }}>
          <Typography variant="h6"><b>Available Leave:</b> 30</Typography>
          <Typography variant="h6"><b>Leave Taken:</b> 5</Typography>
        </div>
      </Item>
    </div>
  ));

  const chunkedBoxes = [];
  for (let i = 0; i < boxes.length; i += 5) {
    chunkedBoxes.push(boxes.slice(i, i + 5));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Box style={{ display: "flex" }} key={index}>
            {chunk}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ApplyLeave;
