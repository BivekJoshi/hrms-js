import * as React from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button, Modal } from '@mui/material';
import { useGetLeave } from '../../hooks/leave/useLeave';
import { useGetEmployee } from '../../hooks/employee/useEmployee';
import { useGetLeaveType } from '../../hooks/leaveType/useLeaveType';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Leave = ({ isLoading }) => {
  const { data: leaveData, isLoading: loadingleave } = useGetLeave();
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();
  const { data: leaveTypeData, isLoading: loadingleaveType } = useGetLeaveType();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading || loadingemployee || loadingleaveType) return <>Loading</>;

  const getEmployeeName = (rowData) => {
    const employeeId = rowData.employeeId;
    const employee = employeeData.find((emp) => emp.id === employeeId);
    const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`
    return name;
  };

  const getLeaveTypeName = (rowData) => {
    const leaveTypeId = rowData.leaveTypeId;
    const leaveType = leaveTypeData.find((leave) => leave.id === leaveTypeId);
    const name = `${leaveType.leaveName}`
    return name;
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id,
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      width: 80,
    },
    {
      title: "Employee Name",
      render: (rowData) => {
        return (
          <p>{getEmployeeName(rowData)}</p>
        )
      },
      width: 200,
    },
    {
      title: "Leave Type",
      render: (rowData) => {
        return (
          <p>{getLeaveTypeName(rowData)}</p>
        )
      },
      width: 200,
    },
    {
      title: "From",
      field: "fromDate",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "To",
      field: "toDate",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Status",
      field: "leaveStatus",
      emptyValue: "-",
      width: 100,
      cellStyle: rowData => {
        let color;
        switch (rowData.leaveStatus) {
          case "APPROVED":
            color = "green";
            break;
          case "PENDING":
            color = "orange";
            break;
          case "REJECTED":
            color = "red";
            break;
          default:
            color = "inherit";
        }
        return {
          color: color,
        };
      },
    },
    {
      title: "Remark",
      field: "leaveRemarks",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Approved By",
      field: "confirmById",
      emptyValue: "-",
      width: 40,
    },
  ];

  return (
    <>
      { }
      <Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleOpen}>+Add Leave</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <CompanyForm onClose={handleClose} /> */}
        </Box>
      </Modal>
      <br /><br />
      <MaterialTable
        columns={columns}
        data={leaveData}
        title=''
        isLoading={loadingleave}
        options={{
          padding: 'dense',
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            fontSize: 20,
            padding: 'dense',
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          }
        }}
        onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
      />
    </>
  );
}

export default Leave;
