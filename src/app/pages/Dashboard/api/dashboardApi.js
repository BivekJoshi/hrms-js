import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../auth/axiosInterceptor';

const testData = {
  totalUser: 4,
  totalEmployee: 14,
  totalEvents: 2,
  totalEvents: 4,
  totalProjects: 2,
  employeeInfo: {
    allEmployee: 14,
    newEmployee: 11,
    maleEmployee: 12,
    femaleEmployee: 2,
  },
  projectInfo: {
    completed: 0,
    pending: 1,
    workInProgress: 0,
    delayed: 1,
    terminated: 0,
  },
};

const fetchDashBoard = () => {
  return axiosInstance.get('dashboard');
};

export const useDashBoardSearch = (onSuccess, onError) => {
  return useQuery(['dash-information'], () => fetchDashBoard(), {
    onSuccess,
    onError,
    select: (response) => {
      console.log(
        '🚀 ~ file: dashboardApi.js:39 ~ returnuseQuery ~ response:',
        response
      );
      return response;
    },
    // select: (response) => testData,
  });
};
