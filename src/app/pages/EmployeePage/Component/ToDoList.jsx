import { Chip, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useGetTodoList } from "../../../hooks/todoList/useTodoList";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import Todo from "../../../../assets/todo.png"

const ToDoList = () => {
  const { data: todoListData, isLoading } = useGetTodoList();
  const { mode, palette } = useContext(ThemeModeContext);
  console.log(todoListData);
  return (
    <Grid className="employeeDeshbord">
      <Typography variant="h5">Todo List </Typography>
      <Grid display="grid" gap="1rem" minHeight={"218px"}>
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
                      Dec
                    </Typography>
                    <Typography
                      fontSize="11px"
                      textAlign="center"
                      bgcolor={mode === "light" ? "#fff" : ""}
                    >
                      25
                    </Typography>
                  </div>
                  <Typography fontWeight={600} fontSize="14px">
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
                    width: " 5rem",
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
      <Grid textAlign="center">
        <ButtonComponent
          OnClick={() => {
            navigate("/employee/event");
          }}
          buttonName={"Click here to see all todo list"}
        />
      </Grid>
    </Grid>
  );
};

export default ToDoList;
