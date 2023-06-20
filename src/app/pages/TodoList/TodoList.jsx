import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { axiosInstance } from "../../../auth/axiosInterceptor";
import "./todolist.css";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TodoList = () => {
  const [ msg, setMsg ] = useState("");
  const [ getData, setGetData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg) {
      toast("Message is required")
      return;
    }
    axiosInstance.post(`/to-do-list?message=${msg}`)
      .then(res => {
        console.log(res)
        toast("Message sent successfully");
      })
      .catch((err) => console.log(err))
      .finally(setMsg(""));
  };

  useEffect(() => {
    axiosInstance.get("/to-do-list/get-all")
      .then((res) => {
        setGetData(res)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ maxWidth: "90%" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Message:</label>
          <input type="text" name="message" placeholder="Enter a message..." value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button type="submit">Send</button>
        </form>
      </div>

      <MaterialTable
        title="Todo List"
        data={getData}
        columns={[
          { title: "ID", field: "id" },
          { title: "Message", field: "message" },
          { title: "UserId", field: "userId" },
          { action: "edit", field: "Edit" },
          
        ]}
      />
    </>
  );
};

export default TodoList;
