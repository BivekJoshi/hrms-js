import React from "react";
import { useGetRole } from "../../../../hooks/auth/roles/useRole";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Roles = () => {
  const { data: roleData, isLoading } = useGetRole();

  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginY: "1rem",
        }}
      >
        {roleData &&
          roleData.map((role, index) => {
            const panelId = `panel${index + 1}`;
            return (
              <div key={index}>
                <Accordion
                  expanded={expanded === panelId}
                  onChange={handleChange(panelId)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${panelId}-content`}
                    id={`${panelId}-header`}
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      {role.name
                        .replace("ROLE_", "")
                        .toLowerCase()
                        .replace(/^\w/, (c) => c.toUpperCase())
                        .replace(/_/g, " ")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
      </Box>
    </>
  );
};

export default Roles;
