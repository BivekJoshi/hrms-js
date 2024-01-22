import React from "react";
import { format, addMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import CustomTable from "../../components/CustomTable/CustomTable";

const Age = (dateOfBirth) => {
  const year = new Date(dateOfBirth).getFullYear();
  const cyear = new Date().getFullYear();
  const age = cyear - year;
  return age;
};

const Birthdaytable = ({ data, isloading, currMonth }) => {
  const today = new Date();
  const Data = data
    ?.map((row, i) => {
      const currentYear = new Date().getFullYear();
      let empBday = row.dateOfBirth.split("-");
      const bdayThisYear = `${currentYear}-${empBday[1]}-${empBday[2]}`;
      const dateOfBirth = new Date(row.dateOfBirth);
      const isTodayBirthday =
        dateOfBirth.getMonth() === today.getMonth() &&
        dateOfBirth.getDate() === today.getDate();
      const age = Age(row.dateOfBirth);
      return {
        fullName: `${row.fullName}`,
        position: row?.positionName || "",
        dateOfBirth: format(new Date(row.dateOfBirth), "dd MMMM", {
          locale: enUS,
        }),
        dayOfBirth: format(new Date(bdayThisYear), "EEEE", {
          locale: enUS,
        }),
        age: age,
        gender: row.gender || "",
        isTodayBirthday: isTodayBirthday,
      };
    })
    .sort((a, b) => {
      if (a.isTodayBirthday && !b.isTodayBirthday) {
        return -1;
      } else if (!a.isTodayBirthday && b.isTodayBirthday) {
        return 1;
      } else {
        return 0;
      }
    });
  return (
    <CustomTable
      columns={[
        {
          title: "Name",
          field: "fullName",
          sorting: false,
          // cellStyle: (rowData) => ({         
          //   // backgroundColor: rowData?.isTodayBirthday === true ? "red" : "blue",
          // }),
          // cellStyle: (rowData) => {
          // },
        },
        { title: "Position", field: "position", sorting: false },
        { title: "Date", field: "dateOfBirth", sorting: false },
        { title: "Day", field: "dayOfBirth", sorting: false },
        { title: "Age", field: "age", sorting: false },
        { title: "Gender", field: "gender", sorting: false },
      ]}
      data={Data}
      title={"Birthday List of " + currMonth}
      rowStyle={(rowData) => ({
        backgroundColor:
          rowData.isTodayBirthday === true ? "rgb(92, 165, 3)" : "",
        color: rowData.isTodayBirthday ? "white" : "",
        fontSize: ".8rem",
      })}
    />
  );
};

export default Birthdaytable;
