import React from "react";
import BankTable from "./BankTable";
import {
  CardHeader,
  List,
} from "@mui/material";

const EMPLOYEE = {
  Gender: "MALE",
  CitizenshipNumber: "157-451235",
  PANNumber: "451235",
  DateofBirth: "1990-06-15",
  MobileNumber: "9865675434",
  Email: "dhirajraj78@gmail.com",
  Address: "Baluwatar, Kathmandu",
  MaritalStatus: "Married",
  DateofJoin: "2022-01-06",
  Position: "Paid-Intern",
  Department: "Technical",
};

const FAMILYMEMBERS = {
  Name: "Dinesh Raj Joshi",
  Relation: "Father",
  ContactNumber: "9851242365",
};

const Bankdetail = () => {
  return (
    <>
      <CardHeader title="Basic Info" />

      <List className="BasicInfoList" sx={{ bgcolor: "background.paper" }}>
        <BankTable data={EMPLOYEE} />
        <CardHeader title="Family Info" />
        <BankTable title="Family Member Info" data={FAMILYMEMBERS} />
      </List>
    </>
  );
};

export default Bankdetail;