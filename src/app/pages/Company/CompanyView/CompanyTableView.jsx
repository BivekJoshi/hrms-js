import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PermissionHoc from '../../../hoc/permissionHoc';
import useAuth from '../../../../auth/hooks/component/login/useAuth';
import CustomTable from '../../../components/CustomTable/CustomTable';
import HocButton from '../../../hoc/hocButton';
import { Chip, Tooltip, Typography } from '@mui/material';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import { useContext } from 'react';

const CompanyTableView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  const { isEmployee } = useAuth();
  const { palette } = useContext(ThemeModeContext);
  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      field: 'tableData.id',
      width: '6%',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Branch Name',
      field: 'branchName',
      emptyValue: '-',
      width: '80px',
      sorting: false,
    },
    {
      title: 'Branch Address',
      field: 'branchAddress',
      emptyValue: '-',
      width: '80px',
      sorting: false,
    },
    {
      title: 'Contact',
      field: 'branchContact',
      emptyValue: '-',
      width: '80px',
      sorting: false,
    },
    {
      title: 'Description',
      field: 'branchDescription',
      emptyValue: '-',
      width: '120px',
      render: (rowData) => {
        return (          
            <Typography
              style={{
                // overflow: 'hidden',
                // textOverflow: 'ellipsis',
                // width: '20rem',
              }}
            >
              {rowData?.branchDescription}
            </Typography>
        );
      },
    },
  ];

  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: palette?.text?.primary,
            '&:hover': {
              color: 'green',
            },
          }}
        />
      ),
      disabled: !permissions?.canEdit,
      tooltip: 'Edit Branch',
      onClick: (event, rowData) => handleEditCompany(rowData),
    },
    {
      icon: () => (
        <DeleteIcon
          sx={{
            color: palette?.text?.primary,
            '&:hover': {
              color: 'red',
            },
          }}
        />
      ),
      disabled: !permissions?.canDelete,
      tooltip: 'Delete Branch',
      onClick: (event, rowData) => handleDeleteCompany(rowData),
    },
  ];

  if (isEmployee) {
    actions.length = 0;
  }

  if (isLoading) return <>Loading</>;

  return (
    <>
      <CustomTable
        columns={columns}
        data={companyData}
        title='Branch List'
        isLoading={isLoading}
        // exportButton={true}
        actions={actions}
        // exportExcel
      />
    </>
  );
};

export default CompanyTableView;
