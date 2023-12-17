import { axiosInstance } from '../../../auth/axiosInterceptor';

/*________________________GET_____________________________________*/
export const getConvertedDate = async (date) => {
  if (date) {
    try {
      const response = await axiosInstance.get(
        `/calender/convert-date/yyyy-mm-dd?date=${date}&isAdDate=true`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching converted date:', error);
      throw error;
    }
  }
};
