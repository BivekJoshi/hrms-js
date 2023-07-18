import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const FilterProject = ({ data, handleProjectFilter }) => {
  return (
    <>
        <Autocomplete
          sx={{ width: 200 }}
          options={data}
          autoHighlight
          getOptionLabel={(option) => option.projectName}
          onChange={(event, value) =>(value?.projectName || "")}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.projectName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Projects"
              inputProps={{
                ...params.inputProps,
                style: { height: 20 },
                autoComplete: "new-password",
              }}
            />
          )}
        />
    </>
  );
};
