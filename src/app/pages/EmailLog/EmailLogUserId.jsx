import React, { useContext, useState } from 'react';
import CustomTable from '../../components/CustomTable/CustomTable';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useGetEmailLogByFilter } from '../../hooks/emailLog/useEmailLog';
import { useLocation } from 'react-router-dom';
import { useGetUserControl } from '../../hooks/auth/userControl/useUserControl';
import ThemeModeContext from '../../../theme/ThemeModeContext';
import useEmailResendForm from '../../hooks/emailLog/EmailLogForm/useEmailLogForm';

const EmailLogUserId = () => {
  const [id, setId] = useState('');
  const [passId, setPassId] = useState('');
  const location = useLocation();
  const { data: userData, isLoading: loadingUser } = useGetUserControl();

  const userId = location?.state?.rowData?.id || null;

  const userIdFromEmailLog = location?.state?.rowData?.user?.id || null;

  const { palette } = useContext(ThemeModeContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { formik } = useEmailResendForm(passId);

  const {
    data,
    isLoading,
    refetch: refetchFilterData,
  } = useGetEmailLogByFilter(userId, id, userIdFromEmailLog);

  const handleClick = (rowData) => {
    const UserId = rowData?.user?.id;
    setPassId(UserId);
    formik.handleSubmit();
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: '1px',
      sortable: false,
      sorting: false,
    },
    // {
    //   title: "User Name",
    //   field: "user.name",
    //   emptyValue: "-",
    //   width: 200,
    //   sorting: false,
    // },
    // {
    //   title: "Email",
    //   field: "user.email",
    //   emptyValue: "-",
    //   width: 200,
    //   sorting: false,
    // },
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
      sorting: false,
    },
    {
      title: 'Actions',
      render: (rowData) => (
        <Stack direction='row' spacing={0}>
          {rowData.emailType === 'CREATE_USER' &&
            rowData.result !== 'SUCCESS' && (
              <Button color='primary' onClick={() => handleClick(rowData)}>
                action
              </Button>
            )}
        </Stack>
      ),
      sorting: false,
    },
  ].filter(Boolean);

  const handleUserIdChange = (event) => {
    const newValue = event.target.value;
    setId(newValue);
  };

  const handleFilterButtonClick = () => {
    refetchFilterData();
  };

  const tableTitle = userId
    ? `Email Log for : ${data?.[0]?.user?.name}`
    : 'Email Log';
  return (
    <Box>
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          padding: '16px',
          borderRadius: '6px',
          //   backgroundColor: palette?.background?.default,
          justifyContent: 'flex-end',
        }}
      >
        {/* <TextField
          id="userId"
          name="userId"
          label="User Name"
          placeholder="Select user name"
          fullWidth
          required
          value={id}
          onChange={handleUserIdChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        /> */}
        <Grid item xs={3}>
          <Autocomplete
            id='userId'
            name='userId'
            options={userData || []}
            getOptionLabel={(user) => `${user?.name}`}
            value={userData?.find((user) => user.id === id) || null}
            onChange={(event, newValue) => setId(newValue?.id || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label='User Name'
                placeholder='Select user name'
                fullWidth
                required
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                size='small'
              />
            )}
          />
        </Grid>

        <Grid item xs={2}>
          <Button onClick={handleFilterButtonClick} variant='contained'>
            Submit
          </Button>
        </Grid>
      </Grid>

      <CustomTable
        columns={columns}
        data={data}
        title={tableTitle}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default EmailLogUserId;
