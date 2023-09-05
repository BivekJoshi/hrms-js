import React from "react";
import { useGetConvertedDate } from "./useCalender";

function UseCalenderForm() {
  // const date = new Date(); 
const date="2023/03/02";
  const { data, isLoading, isError } = useGetConvertedDate(date);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div>
      <p>Converted Date: {data}</p>
    </div>
  );
}

export default UseCalenderForm;
