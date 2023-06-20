import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { axiosInstance } from "../../../auth/axiosInterceptor";
import "./todolist.css";

const TodoList = () => {
  const [ data, setData ] = useState([]);
  
  useEffect(() => {
    axiosInstance.get("/user")
    .then((res) => setData(res))
    .catch((err)=> console.log(err));
  }, []);

  return (
    <>
      <div style={{ maxWidth: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {
          data.map((item, index) => (
            <div key={index}>
            <MaterialTable  
            columns={[
              { title: "S.N.", field: "serial_number" },
              { title: "Name", field: "name" },
              { title: "mobileNo", field: "mobileNo" },
              { title: "address", field: "address" },
              { title: "email", field: "email" },
            ]}
            data= {[
              { serial_number: item.id, name: item.name, mobileNo: item.mobileNo, address: item.address, email: item.email }
            ]}
            >
            </MaterialTable>
            </div>
          ))
        }
        {/* <MaterialTable
          columns={[
            { title: "S.N.", field: "serial_number" },
            { title: "Name", field: "name" },
            { title: "Surname", field: "surname" },
            { title: "address", field: "address" },
            { title: "phoneNumber", field: "phoneNumber" },
          ]}
          data={[
            {
              serial_number: "1",
              name: "Ganesh",
              surname: "Bhatt",
              address: "Bheemdattnagar",
              phoneNumber: "9861989252",
            },
            {
              serial_number: "2",
              name: "Rahul",
              surname: "Joshi",
              address: "Kanchanpur",
              phoneNumber: "9809425372",
            },
          ]}
        >
          hello
        </MaterialTable> */}
      </div>
    </>
  );
};

export default TodoList;