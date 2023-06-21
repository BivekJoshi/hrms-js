import React from "react";
import { format, addMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import MaterialTable from "@material-table/core";

const Age = (dateOfBirth) => {
  const year = new Date(dateOfBirth).getFullYear();
  const cyear = new Date().getFullYear();
  const age = cyear - year;
  return age;
};

const Birthdaytable = ({ data, isLoading, currMonth }) => {
  const today = new Date();
  const Data = data
    .map((row, i) => {
      const currentYear = new Date().getFullYear();
      let empBday = row.dateOfBirth.split("-");
      const bdayThisYear = `${currentYear}-${empBday[1]}-${empBday[2]}`;
      const dateOfBirth = new Date(row.dateOfBirth);
      const isTodayBirthday =
        dateOfBirth.getMonth() === today.getMonth() &&
        dateOfBirth.getDate() === today.getDate();
      const age = Age(row.dateOfBirth);

      return {
        // fullName: `${row.firstName} ${row.middleName === null ? "" : row.middleName
        //   } ${row.lastName}`,
        fullName:`${row.fullName}`,
        position: row.position?.positionName,
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

  // console.log(Data);
  return (
    <MaterialTable
      title={currMonth}
      columns={[
        { title: "Name", field: "fullName" },
        // { title: "Position", field: "position" },
        { title: "Date", field: "dateOfBirth" },
        { title: "Day", field: "dayOfBirth" },
        { title: "Age", field: "age" },
        // { title: "Gender", field: "gender" },
      ]}
      data={Data}
      options={{
        padding: 'dense',
        margin: 50,
        pageSize: 5,
        emptyRowsWhenPaging: false,
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
        },
        rowStyle: (rowData) => ({
          backgroundColor: rowData.isTodayBirthday === true ? "green" : "",
          color: rowData.isTodayBirthday ? "white" : "",
        }),
      }}
    />
  );
};

export default Birthdaytable;
