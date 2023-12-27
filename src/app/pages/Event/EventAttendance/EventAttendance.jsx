import React from 'react';
import { useGetEventAttenderList } from '../../../hooks/event/useEvent';

const EventAttendance = () => {
  const { data } = useGetEventAttenderList();
  console.log(
    '🚀 ~ file: EventAttendance.jsx:6 ~ EventAttendance ~ data:',
    data
  );

  return <div>EventAttendance</div>;
};

export default EventAttendance;
