import React from 'react';
import { useGetEventAttenderList } from '../../../hooks/event/useEvent';

const EventAttendance = () => {
  const { data } = useGetEventAttenderList();

  return <div>EventAttendance</div>;
};

export default EventAttendance;
