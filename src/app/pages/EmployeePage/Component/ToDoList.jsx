import { Chip, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useGetTodoList } from "../../../hooks/todoList/useTodoList";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import Todo from "../../../../assets/todo.png";
import { useNavigate } from "react-router-dom";

const ToDoList = () => {
  const navigate = useNavigate();
  const { data: todoListData, isLoading } = useGetTodoList();
  const { mode, palette } = useContext(ThemeModeContext);

  // only day and month
  const getUpcomingDay = (eventDate) => {
    const eventDateObject = new Date(eventDate);
    const month = eventDateObject.toLocaleString("default", { month: "short" });
    const day = eventDateObject.getDate();
    return { day, month };
  };

  return (
    <Grid display="flex" flexDirection="column" gap="1rem">
      <Typography variant="h5">Todo List</Typography>
      <Grid display="grid" gap="1rem">
        {todoListData?.length > 0 ? (
          todoListData?.slice(0, 3).map((notify, index) => (
            <Grid key={index}>
              <Grid
                onClick={() => toggleDropdown(index)}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                borderRadius="8px"
                padding=".5em 1rem"
                alignItems="center"
                bgcolor={palette.background.toDo}
                boxShadow={2}
              >
                <Grid
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                  padding='0 1rem'
                >
                  <div
                    style={{
                      border: "1px solid #E0E0E0",
                      borderRadius: "6px 6px 0 0",
                      
                    }}
                  >
                    <Typography
                      style={{
                        backgroundColor: "#216a6a",
                        padding: "1px 8px",
                        color: "#fff",
                        borderRadius: "6px 6px 0 0",
                      }}
                      fontSize="11px"
                    >
                      {getUpcomingDay(notify?.dueDate).month}
                    </Typography>
                    <Typography
                      fontSize="11px"
                      textAlign="center"
                      bgcolor={mode === "light" ? "#fff" : ""}
                    >
                      {getUpcomingDay(notify?.dueDate).day}
                    </Typography>
                  </div>
                  <Typography
                    fontWeight={500}
                    fontSize="14px"
                    sx={{
                      overflowWrap: "break-word",
                      textTransform: "capitalize",
                      wordBreak: "break-all",
                      // textTransform: 'justify',
                    }}
                  >
                    {notify?.message}
                  </Typography>
                </Grid>
                <Chip
                  label={
                    notify?.priority === "HIGH" ? (
                      <Typography fontSize="12px">High</Typography>
                    ) : notify?.priority === "MEDIUM" ? (
                      <Typography fontSize="12px">Medium</Typography>
                    ) : (
                      <Typography fontSize="12px">Low</Typography>
                    )
                  }
                  style={{
                    backgroundColor:
                      notify?.priority === "HIGH"
                        ? "green"
                        : notify?.priority === "MEDIUM"
                        ? "red"
                        : "orange",
                    color: "white",
                    minWidth: "4rem",
                  }}
                />
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid
            padding="28px 16px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            bgcolor="#EFF1F1"
            gap={1}
          >
            <img src={Todo} alt="todo.png" />

            <Typography variant="h6">No To-do Set</Typography>
          </Grid>
        )}
      </Grid>
      {todoListData?.length >= 4 && (
        <Grid textAlign="center">
          <ButtonComponent
            OnClick={() => {
              navigate("/employee/todolist");
            }}
            buttonName={"Click here to see all todo list"}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ToDoList;
