import React from 'react';
import CustomTable from '../../components/CustomTable/CustomTable';
import { useGetEmailLogByFilter } from '../../hooks/emailLog/useEmailLog';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import ThemeModeContext from '../../../theme/ThemeModeContext';

const EmailLog = () => {
  const { data, isLoading } = useGetEmailLogByFilter();
  const navigate = useNavigate();

  const handleViewLog = (rowData) => {
    navigate(`/admin/mail-log-id`, { state: { rowData } });
  };
  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: '1px',
      sortable: false,
      sorting: false,
    },
    {
      title: 'User Name',
      field: 'user.name',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Email',
      field: 'user.email',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Email Type',
      field: 'emailType',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Log',
      field: 'log',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Result',
      field: 'result',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Time Stamp',
      field: 'timeStamp',
      emptyValue: '-',
      width: 200,
      render: (rowData) => {
        const timeStamp = rowData.timeStamp;
        if (timeStamp) {
          const formattedDate = new Date(timeStamp).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }
          );

          return formattedDate;
        }
      },
    },
  ].filter(Boolean);

  const { mode } = React.useContext(ThemeModeContext);

  const actions = [
    {
      icon: () => (
        <RemoveRedEyeOutlinedIcon
          sx={{
            color: mode === 'light' ? 'black' : 'white',
            '&:hover': {
              color: 'green',
            },
          }}
        />
      ),
      tooltip: 'View Details',
      onClick: (event, rowData) => handleViewLog(rowData),
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        singleAction
        data={data}
        title='Email Log'
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
};

export default EmailLog;
