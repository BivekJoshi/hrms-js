import React from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AirlineSeatFlatOutlinedIcon from "@mui/icons-material/AirlineSeatFlatOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const item = [
  {
    leaveName:"Casual Leave",
    total: 30,
    available: 12,
  },
  {
    leaveName:"Sick Leave",
    total: 40,
    available: 142,
  },
  {
    leaveName:"Festival Leave",
    total: 340,
    available: 152,
  },
  {
    leaveName:"Unpaid Leave",
    total: 30,
    available: 162,
  },
  {
    leaveName:"	Annual Leave",
    total: 360,
    available: 12,
  },
  {
    leaveName:"	Paternity Leave",
    total: 307,
    available: 12,
  },
  {
    leaveName:"Maternity Leave",
    total: 307,
    available: 12,
  },
  {
    leaveName:"Maternity_additional Leave",
    total: 307,
    available: 12,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: 290,
  maxHeight: 310,
  padding: 30,
  margin: 8,
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
  const boxes = item.map((data, index) => (
    <div key={index}>
      <Item>
        <Typography variant="h5">
          <b>{data.leaveName}</b>
        </Typography>
        <Typography variant="h2" color="#3e019b" style={{ marginTop: 25 }}>
          <AirlineSeatFlatOutlinedIcon fontSize="300px" />
        </Typography>
        <div style={{ marginTop: 45 }}>
          <Typography variant="h6">
            <b>Available Leave:</b> {data.available}
          </Typography>
          <Typography variant="h6">
            <b>Total Leave:</b> {data.total}
          </Typography>
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
          <Box style={{ display: "flex", padding: 0, margin: 0 }} key={index}>
            {chunk}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ApplyLeave;
