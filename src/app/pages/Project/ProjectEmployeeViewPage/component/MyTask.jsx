import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Male from "../../../../../assets/male.png";
import { useGetTaskLoggedInUser } from "../../../../hooks/project/ProjectTask/useProjectTask";
import ProjectTaskField from "../../../../components/Form/Project/ProjectTask/ProjectTaskFields";

export const MyTask = () => {
  const { data: loginUsertask } = useGetTaskLoggedInUser();
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Box padding="2rem 0 0 0">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">My Task</Typography>
        <div>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)} variant="contained">
                +
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                <Box
                  sx={{ width: 350, padding: 5 }}
                  role="presentation"
                  //   onClick={toggleDrawer(anchor, false)}
                  //   onKeyDown={toggleDrawer(anchor, false)}
                >
                  <ProjectTaskField
                    onClose={() => setState({ right: false })}
                  />
                </Box>
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1rem"
        padding="1rem 0"
      >
        {loginUsertask?.map((data, index) => (
          <Box
            key={index}
            bgcolor="#ededed66"
            padding="1rem"
            boxShadow="5"
            borderRadius=".5rem"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography
                fontSize="1rem"
                fontWeight="600"
                width="80%"
                padding=".5rem 0"
              >
                <Chip
                  sx={{
                    fontSize: ".9rem",
                    width: "80%",
                    bgcolor: "#ededed66",
                  }}
                  label={
                    <Typography variant='h6'
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginLeft: "-.5rem",
                        color: "#01579b",
                      }}
                    >
                      {data?.name}
                    </Typography>
                  }
                />
              </Typography>
              <Chip
                label={"Priority: " + data?.priority}
                sx={{ fontSize: ".7rem", height: "18px" }}
              />
            </Box>
            <Typography fontSize=".8rem">{data?.detail}</Typography>

            <Divider />
            <Stack
              marginTop=".5rem"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Chip
                label={data?.dueDate}
                variant="outlined"
                icon={<QuestionAnswerIcon sx={{ width: ".7rem" }} />}
                sx={{ height: "20px" }}
              />
              <Chip
                sx={{ bgcolor: "#ededed66", height: "20px" }}
                avatar={<Avatar alt="Natacha" src={Male} />}
              />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
