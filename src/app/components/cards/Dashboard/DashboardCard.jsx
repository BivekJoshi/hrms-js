import React, { useContext } from "react";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({
  title,
  icon,
  count,
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
      Width="232px"
      Height="80px"
      borderRadius="0px 8px 8px 0px"
      borderLeft={`6px solid ${borderColor}`}
      padding="8px 20px 8px 20px"
      boxShadow={7}
      onClick={handleClick}
      bgcolor={mode === "light" ? "" : "#3f413f"}
      sx={{cursor: 'pointer'}}
    >
      <Grid>
        <Typography
          align="center"
          color={mode === "light" ? `${borderColor}` : "white"}
          fontSize="14px"
          fontWeight={"500"}
          Lineheight="20px"
        >
          {title}
        </Typography>
        <Divider
          sx={{
            border: `1px solid ${borderColor}`,
            height: "3px",
            width: "42px",
            background: ` ${borderColor}`,
          }}
        />
      </Grid>

      <Divider orientation="vertical" flexItem />
      <Stack flexDirection="column">
        <img src={icon} alt="" />
        <Typography
          variant="h7"
          // color="black"
          align="center"
          fontWeight={500}
          color={mode === "light" ? "" : "white"}
        >
          {count}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DashboardCard;
