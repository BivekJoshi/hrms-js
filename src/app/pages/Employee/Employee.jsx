import React, { useState } from "react";
import { useGetEmployee, useGetEmployeeData } from "../../hooks/employee/useEmployee";
import { Box, Grid, Button, Modal } from "@mui/material";
import EmployeeBasicInfoForm from "../../components/Form/Employee/EmployeeBasicInfoForm/EmployeeBasicInfoForm";
import useAddEmployeeForm from "../../hooks/employee/AddEmployee/useAddEmployeeForm";
import { toast } from "react-toastify";
import EmployeeCard from "../../components/cards/Employee/EmployeeCard";
import { PagePagination } from "../../components/Pagination/PagePagination";

const Employee = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: employeeData, isLoading } = useGetEmployee();
  const { formik } = useAddEmployeeForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

const employeArray = Array.isArray(employeeData)
? employeeData : employeeData? Object.values(employeeData) : [];


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = employeArray.slice(indexOfFirstPost, indexOfLastPost);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <>Loading</>;
  return (
    <Box padding="1rem">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
          style={{ marginBottom: "20px" }}
        >
          Add Employee
        </Button>
      </Box>
      <Grid
        container
        item
        gap={3}
        className="project-card-control"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {currentPosts?.map((employee, index) => (
            <EmployeeCard
              Key={index}
              IsActive={employee.isActive}
              EmployeeId={employee.id}
              EFirstName={employee.firstName}
              EMiddleName={employee.middleName}
              ELastName={employee.lastName}
              OfficeEmail={employee?.officeEmail}
              MobileNumber={employee?.mobileNumber}
              Position={employee?.position?.positionName}
              EmployeeData={currentPosts}
            />
        ))}
      </Grid>
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={style}>
            <EmployeeBasicInfoForm formik={formik} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  formik.handleSubmit();
                  formik.isValid
                    ? null
                    : toast.error(
                        "Please make sure you have filled the form correctly"
                      );
                }}
                sx={{ mt: 3, ml: 1 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box padding="2rem" display="grid" justifyContent={"center"}>
        <PagePagination 
        PostsPerPage={postsPerPage}
        TotalPosts={employeeData.length}
        CurrentPage={currentPage}
        Paginate={paginate}
        />
      </Box>
    </Box>
  );
};

export default Employee;