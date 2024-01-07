import React, { useContext } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const EmployTaskCard = ({
  title,
  taskIcon,
  numberOfTask,
  linkTo,
  borderColor,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkTo);
  };

  const { mode } = useContext(ThemeModeContext);

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="0px 8px 8px 0px"
      borderLeft={`6px solid ${borderColor}`}
      padding="8px 20px 8px 20px"
      boxShadow={7}
      onClick={handleClick}
      bgcolor={mode === "light" ? "" : "#3f413f"}
    >
      <Grid>
        <Typography
          align="center"
          color={mode === "light" ? `${borderColor}` : "white"}
          fontSize="14px"
          fontWeight={"500"}
          lineheight="20px"
        >
          {title}
        </Typography>
        <Divider
          sx={{
            border: `1px solid ${borderColor}`,
            height: "3px",
            width:"42px",
            background: ` ${borderColor}`,
          }}
        />
      </Grid>

      <Divider orientation="vertical" flexItem />
      <Stack
      flexDirection="column">
        <img src={taskIcon} alt="" />
        <Typography
          variant="h7"
          // color="black"
          align="center"
          fontWeight={500}
          color={mode === "light" ? "" : "white"}
        >
          {numberOfTask}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EmployTaskCard;
