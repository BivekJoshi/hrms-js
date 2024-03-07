import { ADToBS, BSToAD } from "bikram-sambat-js";

const dateConverter = (date, conversionType) => {
  if (date) {
    try {
      switch (conversionType) {
        case "AD_BS":
          return ADToBS(date);
        case "BS_AD":
          return BSToAD(date);
        default:
          return date;
      }
    } catch (err) {
      alert("Invalid Date");
    }
  }
};

export default dateConverter;