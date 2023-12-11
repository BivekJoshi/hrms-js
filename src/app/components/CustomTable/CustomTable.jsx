import MaterialTable from 'material-table';
import React, { useContext } from 'react';
import ThemeModeContext from '../../../theme/ThemeModeContext';
import tableIcons from '../../../theme/overrides/TableIcon';

const CustomTable = (props) => {
  const { palette } = useContext(ThemeModeContext); // Accessing mode from context
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        columns={props?.columns}
        data={props?.data}
        title={props?.title}
        isLoading={props?.isLoading}
        options={{
          search: props?.search || true,
          tableLayout: 'fixed',
          padding: 'dense',

          pageSize: props?.pageSize || 10,
          emptyRowsWhenPaging: props?.emptyRowsWhenPaging || false,
          exportButton: props?.exportButton || false,
          headerStyle: {
            backgroundColor: palette?.primary?.main,
            color: '#FFF',
            fontSize: '.8rem',
            fontWeight: 'bold',

            textAlign: 'center',
            border: '1px solid #fff',

            textTransform: 'capitalize',
          },

          actionsColumnIndex: -1,
          rowStyle: props?.rowStyle || {
            fontSize: '.8rem',
          },
        }}
        actions={props?.actions}
      />
    </div>
  );
};

export default CustomTable;
