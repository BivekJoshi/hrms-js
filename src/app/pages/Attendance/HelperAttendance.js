import { ADToBS } from "bikram-sambat-js";

export const getCurrentNepaliMonthDays = (currentDateStr) => {
  let numberOfDaysToAdd = 0;
  let currentDate = new Date(currentDateStr);

  while (true) {
    const nepaliDate = ADToBS(currentDate);
    const nepaliMonth = Number(nepaliDate.split("-")[1]);

    const newCurrentDate = new Date(currentDate);
    newCurrentDate.setDate(newCurrentDate.getDate() + numberOfDaysToAdd);
    const newNepaliDate = ADToBS(newCurrentDate);

    const newNepaliMonth = Number(newNepaliDate.split("-")[1]);

    if (newNepaliMonth !== nepaliMonth) {
      break;
    }
    numberOfDaysToAdd++;
  }

  const nepaliDate = ADToBS(currentDate);
  const nepaliDay = Number(nepaliDate.split("-")[2]);

  return nepaliDay + numberOfDaysToAdd - 1;
};

export const getNepaliMonthName = (month) => {
  switch (month) {
    case "1":
      return "Baishakh";
    case "2":
      return "Jestha";
    case "3":
      return "Ashadh";
    case "4":
      return "Shrawan";
    case "5":
      return "Bhadau";
    case "6":
      return "Ashwin";
    case "7":
      return "Kartik";
    case "8":
      return "Mangsir";
    case "9":
      return "Poush";
    case "10":
      return "Magh";
    case "11":
      return "Falgun";
    case "12":
      return "Chaitra";
    default:
      return "";
  }
};

export const convertNepaliToEnglishNumber = (nepaliNumber) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

  const englishDigits = nepaliNumber.replace(/[०-९]/g, (match) => {
    return nepaliDigits.indexOf(match);
  });

  return englishDigits;
};
