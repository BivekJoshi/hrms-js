import React, { useContext } from "react";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";
import Employee from "../../../../assets/employee.png";
import Event from "../../../../assets/event.png";
import Holiday from "../../../../assets/holiday.png";
import Project from "../../../../assets/project.png";
import User from "../../../../assets/user.png";

const DashboardCard = ({ data }) => {
  const navigate = useNavigate();
  const cardData = [
    {
      title: "Users",
      icon: User,
      count: data?.totalUser,
      linkTo: "/admin/users",
      borderColor: "#3399FF",
    },
    {
      title: "Employees",
      icon: Employee,
      count: data?.totalEmployee,
      linkTo: "/admin/employee",
      borderColor: "#F8B114",
    },
    {
      title: "Events",
      icon: Event,
      count: data?.totalEvents, // Sample data
      linkTo: "/admin/event",
      borderColor: "#108A23",
    },
    {
      title: "Holiday",
      icon: Holiday,
      count: data?.totalHolidays, // Sample data
      linkTo: "/admin/holiday",
      borderColor: "#FF8A7B",
    },
    {
      title: "Project",
      icon: Project,
      count: data?.totalProjects, // Sample data
      linkTo: "/admin/project",
      borderColor: "#875923",
    },
  ];
  const { mode } = useContext(ThemeModeContext);
  const handleClick = (linkTo) => {
    navigate(linkTo);
  };
  return (
    <>
      {cardData?.map((card, index) => (
        <Stack
          key={index}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height="80px"
          borderRadius="0px 8px 8px 0px"
          borderLeft={`6px solid ${card?.borderColor}`}
          padding="8px 20px 8px 20px"
          boxShadow={7}
          onClick={() => handleClick(card?.linkTo)}
          bgcolor={mode === "light" ? "" : "#3f413f"}
          sx={{ cursor: "pointer" }}
        >
          <Grid>
            <Typography
              align="center"
              color={mode === "light" ? `${card?.borderColor}` : "white"}
              fontSize="14px"
              fontWeight={"500"}
              lineheight="20px"
            >
              {card?.title}
            </Typography>
            <Divider
              sx={{
                border: `1px solid ${card?.borderColor}`,
                height: "3px",
                width: "42px",
                background: ` ${card?.borderColor}`,
              }}
            />
          </Grid>

          <Divider orientation="vertical" flexItem />
          <Stack flexDirection="column">
            <img src={card.icon} alt="" />
            <Typography
              variant="h7"
              // color="black"
              align="center"
              fontWeight={500}
              color={mode === "light" ? "" : "white"}
            >
              {card?.count}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default DashboardCard;
