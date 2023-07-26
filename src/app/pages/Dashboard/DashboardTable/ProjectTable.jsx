import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  LinearProgress,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import MaterialTable from "material-table";
import tableIcons from "../../../../theme/overrides/TableIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const ProjectTable = ({ projectData }) => {
  const [open, setOpen] = useState(false);
  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [openDeactivateModal, setOpenDeactiveModal] = useState(false);

  // const [editedProject, setEditedProject] = useState({});
  // const [deactivateProject, setDeactivateProject] = useState({});

  // const anchorRef = useRef(null);
  // const prevOpen = useRef(open);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }
  //   prevOpen.current = open;
  // }, [open]);

  // function handleListKeyDown(event) {
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === "Escape") {
  //     setOpen(false);
  //   }
  // }

  // const handleDeactivateProject = (item) => {
  //   setDeactivateProject(item);
  //   setOpenDeactiveModal(true);
  // };

  // const handleEditProject = (item) => {
  //   setEditedProject(item);
  //   setOpenEditModal(true);
  // };


  const columns = [
    {
      title: "Project Id",
      render: (rowData) => rowData.tableData.id + 1,
      // width: "1%",
      sortable: false,
      cellStyle: {
        Width: "5%",
      },
    },
    {
      title: "Project Name",
      field: "projectName",
      // width: "1%",
      cellStyle: {
        Width: "10%",
      },
    },
    {
      title: "Progress",
      field: "progress",
      // width: "20vh",
      cellStyle: {
        Width: "55%",
      },
      // emptyValue: "-",
      render: (rowData) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "2rem",
            }}
          >
            {/* {rowData.projectName && ( */}
            <LinearProgress
              variant="determinate"
              value={(1 / 2) * 100}
              sx={{ width: "100%" }}
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      field: "action",
      // width: "1%",
      // emptyValue: "-",
      // render: () => {
      //   return (
      //     <Box display="flex" justifyContent={"end"}>
      //       <Button
      //         ref={anchorRef}
      //         id="composition-button"
      //         aria-controls={open ? "composition-menu" : undefined}
      //         aria-expanded={open ? "true" : undefined}
      //         aria-haspopup="true"
      //         onClick={handleToggle}
      //       >
      //         <MoreHorizIcon />
      //       </Button>
      //       <Popper
      //         open={open}
      //         anchorEl={anchorRef.current}
      //         role={undefined}
      //         placement="bottom-start"
      //         transition
      //         disablePortal
      //         sx={{ left: "-3rem !important" }}
      //       >
      //         {({ TransitionProps, placement }) => (
      //           <Grow
      //             {...TransitionProps}
      //             style={{
      //               transformOrigin:
      //                 placement === "bottom-start" ? "left top" : "left bottom",
      //             }}
      //           >
      //             <Paper>
      //               <ClickAwayListener onClickAway={handleClose}>
      //                 <MenuList
      //                   autoFocusItem={open}
      //                   id="composition-menu"
      //                   aria-labelledby="composition-button"
      //                   onKeyDown={handleListKeyDown}
      //                   style={{ fontSize: ".8rem" }}
      //                 >
      //                   <MenuItem
      //                     onClick={() => {
      //                       handleEditProject(item);
      //                     }}
      //                     style={{ fontSize: ".8rem" }}
      //                   >
      //                     Edit
      //                   </MenuItem>
      //                   <MenuItem
      //                     onClick={() => handleDeactivateProject(item)}
      //                     style={{ fontSize: ".8rem" }}
      //                   >
      //                     Terminate Project
      //                   </MenuItem>
      //                 </MenuList>
      //               </ClickAwayListener>
      //             </Paper>
      //           </Grow>
      //         )}
      //       </Popper>
      //     </Box>
      //   );
      // },
      cellStyle: {
        cellWidth: "20px",
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr",
        }}
      >
        {/* {projectData &&
          projectData.map((item, index) => (
            <Box key={index}>{item?.projectName}</Box>
          ))} */}
        <MaterialTable
          icons={tableIcons}
          title="Recent Projects"
          columns={columns}
          data={projectData}
          options={{
            exportButton: true,
            padding: "dense",
            margin: 50,
            pageSize: 10,
            emptyRowsWhenPaging: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              fontSize: "1.2rem",
              padding: "dense",
              height: 50,
            },
            rowStyle: {
              fontSize: ".8rem",
            },
          }}
        />
      </Box>
    </>
  );
};
