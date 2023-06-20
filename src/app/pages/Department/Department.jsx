import * as React from "react";
import { useGetDepartment } from "../../hooks/department/useDepartment";

import MaterialTable from "@material-table/core";

import { Box, Button } from "@mui/material";
import DepartmentForm from "../../components/Form/Department/DepartmentForm";
import FormModal from "../../components/Modal/FormModal";





const columns = [
  {
    title: "SN",
    render: (rowData) => rowData.departmentName,
    cellStyle: {
      whiteSpace: "nowrap", // Prevents content from wrapping
    },
    width: 80,
  },
  {
    title: "Department Name",
    field: "departmentName",
    emptyValue: "-",
    width: 250,
  },
  {
    title: "Department Type",
    field: "departmentType",
    emptyValue: "-",
    width: 200,
  },
  {
    title: "Description",
    field: "departmentDescription",
    emptyValue: "-",
  },
];

const Department = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { data: departmentData, isLoading } = useGetDepartment();
  
    // const newDepartmentData = departmentData.map((item, index) => {
    //   return { ...item, sn: index + 1 };
    // });
    // console.log({"data" : newDepartmentData})

  if (isLoading) return <>Loading</>;
  return (
    <>
      <div>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={handleOpenModal}
          >
            +Add Department
          </Button>
        </Box>
      </div>
      <br></br>

      <MaterialTable
        columns={columns}
        data={departmentData}
        title="Department"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
            color: "#FFF",
            fontSize: 20,
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          },
        }}
        onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
      />

      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        formComponent={<DepartmentForm onClose={handleCloseModal} />}
      />
    </>
  );
};
export default Department;
