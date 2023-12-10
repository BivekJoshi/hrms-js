import MaterialTable from 'material-table';
import React, { useContext } from 'react';
import ThemeModeContext from '../../../theme/ThemeModeContext';

const CustomTable = (props) => {
  const { palette } = useContext(ThemeModeContext); // Accessing mode from context
  return (
    <div>
      <MaterialTable
        icons={props?.icons}
        columns={props?.columns}
        data={props?.data}
        title={props?.title}
        isLoading={props?.isLoading}
        options={{
          padding: 'dense',
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: palette?.primary?.main,
            color: '#FFF',
            fontSize: '1rem',
            padding: 'dense',
            height: 50,
            textAlign: 'center',
            border: '2px solid #fff',
            minHeight: '10px',
            textTransform: 'capitalize',
          },
          rowStyle: {
            fontSize: '.8rem',
          },
        }}
      />
    </div>
  );
};

export default CustomTable;
