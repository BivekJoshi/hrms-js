import { Box, CardMedia, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Male from '../../../../assets/male.png';
import '../../Style/Style.css';
import { LeftEmployDashbord } from './LeftEmployDashbord';
import { RightEmployDashbord } from './RightEmployDashbord';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import { useGetLoggedInUser } from '../../../hooks/auth/usePassword';
import { MiddleEmployDashbord } from './MiddleEmployDashbord';
import { useGetTaskLoggedInUser } from '../../../hooks/project/ProjectTask/useProjectTask';
import { useGetProjectWiseEmployee } from '../../../hooks/project/useProject';
import { DOC_URL } from '../../../../auth/axiosInterceptor';
import Project from '../../../../assets/eproject.png';
import Task from '../../../../assets/etask.png';
import Pending from '../../../../assets/pending.png';
import Complet from '../../../../assets/ecomplet.png';
import EmployTaskCard from '../Component/EmployTaskCard';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../../Redux/Slice/userSlice';

const EmployeeDashbord = ({}) => {
  const { data: employData } = useGetLoggedInUser();
  const { mode } = useContext(ThemeModeContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDetails(employData));
  }, [employData]);

  // const { data: loginUsertask } = useGetTaskLoggedInUser();
  // const { data: projectWiseEmployeeData } = useGetProjectWiseEmployee(
  //   employData?.employeeId
  // );
  // const taskPendingData = Array.isArray(loginUsertask)
  //   ? loginUsertask?.filter(
  //       (status) =>
  //         status.status === "WORK_IN_PROGRESS" || status.status === "PENDING"
  //     )
  //   : "";

  // const taskCompleteData = Array.isArray(loginUsertask)
  //   ? loginUsertask?.filter((status) => status.status === "COMPLETED")
  //   : "";
  const photo = employData?.userPhotoPath;
  const filePath = photo ? DOC_URL + photo : '';

  const task = [
    // {
    //   title: "Total Project",
    //   taskIcon: Project,
    //   numberOfTask: projectWiseEmployeeData
    //     ? projectWiseEmployeeData.length
    //     : 0,
    //   linkTo: "/employee/project",
    //   borderColor: "#3399FF",
    // },
    {
      title: 'Total Task',
      // numberOfTask: loginUsertask ? loginUsertask.length : 0,
      taskIcon: Task,
      linkTo: '/employee/project',
      borderColor: '#FF8A7B',
    },
    {
      title: 'Task Pending',
      // numberOfTask: taskPendingData ? taskPendingData.length : 0,
      taskIcon: Pending,
      linkTo: '/employee/project',
      borderColor: '#F8B114',
    },
    {
      title: 'Task Complete',
      // numberOfTask: taskCompleteData ? taskCompleteData.length : 0,
      taskIcon: Complet,
      linkTo: '/employee/project',
      borderColor: '#108A23',
    },
  ];
  const today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <Box display='grid' gridTemplateRows='1fr' gap='1rem'>
      <Box
        display='flex'
        justifyContent='space-between'
        padding='1rem'
        className={
          mode === 'light' ? 'employeeDeshbordBG' : 'employeeDeshbordBGDark'
        }
        boxShadow='7'
        borderRadius='10px'
      >
        <CardMedia
          component='img'
          src={filePath ? filePath : Male}
          alt='Paella dish'
          sx={{ width: 66, height: 66, borderRadius: '2rem' }}
        />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant='h6' paddingLeft='1rem'>
            Welcome , <br></br>
            {employData?.name}
          </Typography>
          <Typography variant='h6' style={{ maxWidth: '200px' }}>
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      <Box
        display='grid'
        grid
        gridTemplateColumns='repeat(auto-fit, minmax(125px, 1fr))'
        gap='1rem'
        padding='2rem 0 0'
      >
        {task.map((taskDetail, index) => (
          <EmployTaskCard
            key={index}
            title={taskDetail.title}
            numberOfTask={taskDetail.numberOfTask}
            taskIcon={taskDetail.taskIcon}
            borderColor={taskDetail.borderColor}
            linkTo={taskDetail.linkTo}
          />
        ))}
        {/* <EmployPichart task={task}/> */}
      </Box>
      {/* <MiddleEmployDashbord employData={employData} /> */}
      <Box display='grid' gridTemplateColumns='3fr 2fr' gap='3rem'>
        <LeftEmployDashbord />
        <RightEmployDashbord employData={employData} />
      </Box>
    </Box>
  );
};

export default EmployeeDashbord;
