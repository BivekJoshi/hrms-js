import {
  Avatar,
  Box,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Male from "../../../../assets/male.png";

const ProjectMyTask = ({data}) => {
  return (
    <Box padding="2rem 0 0 0">
      <h3>My Task</h3>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1rem"
        padding="1rem 0"
      >
        {data.map((data, index) => (
          <Box bgcolor="#ededed66" padding="1rem" boxShadow="5">
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
                    <h3
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginLeft: "-.5rem",
                      }}
                    >
                      {data?.name}
                    </h3>
                  }
                />
              </Typography>
              <Chip label={data?.status} />
            </Box>
            <Typography>{data?.detail}</Typography>

            <Divider />
            <Stack marginTop=".5rem" flexDirection="row" justifyContent="space-between" >
              <Chip
                label={data.message}
                variant="outlined"
                icon={<QuestionAnswerIcon sx={{ width: ".7rem" }} />}
              />
              <Chip
              sx={{bgcolor:"#ededed66"}}
                avatar={<Avatar alt="Natacha" src={Male} />}
              />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProjectMyTask;
