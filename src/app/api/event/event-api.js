import { axiosInstance } from "../../../auth/axiosInterceptor";

{
  /*________________________GET_____________________________________*/
}
export const getEvent = async () => {
  const data = await axiosInstance.get(`/event/get-all`);
  return data;
};

{
  /*________________________GET-NOTIFICATION_____________________________________*/
}
export const getEventNotification = async () => {
  const data = await axiosInstance.get(`/event/get-notification`);
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getEventById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/event/event-id/${id}`);
    return data;
  }
};

{
  /*________________________GET BY MONTH DATA____________________________________*/
}
export const getEventByMonth = async (monthAd) => {
  if (monthAd) {
    const data = await axiosInstance.get(
      `/event/this-year/month?monthAd=${monthAd}`
    );
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addEvent = async (formData) => {
  const data = await axiosInstance.post("/event/create", formData);
  return data;
};

/*________________________POST FOR APPROVAL_____________________________________*/
export const addEventConfirmation = async (formData) => {
  const data = await axiosInstance.post("/event/confirmation", formData);
  return data;
};
{
  /*________________________DELETE_____________________________________*/
}
export const deleteEvent = async (eventId) => {
  if (eventId) {
    const response = await axiosInstance.delete(`/event/delete/${eventId}`);
    return response.data;
  }
};

{
  /*________________________EDIT_____________________________________*/
}
export const editEvent = async (formData) => {
  const { id } = formData;
  if (id) {
    const data = await axiosInstance.put(`/event/${id}`, formData);
    return data;
  }
};
