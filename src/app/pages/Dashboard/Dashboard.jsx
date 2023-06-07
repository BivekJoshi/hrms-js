import React from 'react';
import { useGetDashboard } from '../../hooks/dashboard/useDashboard';

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useGetDashboard();
  if (isLoading) return <>Loading...</>;
  return (
    <div>
      {dashboardData?.allEmployees}
    </div>
  );
};

export default Dashboard;
