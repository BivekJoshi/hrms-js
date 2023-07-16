import { Grid, Box } from "@mui/material";
import React, { useState } from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";
import { PagePagination } from "../../../../components/Pagination/PagePagination";

const EmployeeGridView = ({ employeeData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const employeArray = Array.isArray(employeeData) ? employeeData : employeeData ? Object.values(employeeData) : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = employeArray.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (isLoading) return <>Loading</>;
  return (
    <>
      <Grid
        container
        item
        gap={1}
        className="project-card-control"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {currentPosts?.map((employee, index) => (
          <EmployeeCard
            key={index}
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

      <Box padding="2rem" display="grid" justifyContent={"center"}>
        <PagePagination
          PostsPerPage={postsPerPage}
          TotalPosts={employeArray.length}
          CurrentPage={currentPage}
          Paginate={paginate}
        />
      </Box>
    </>
  );
};

export default EmployeeGridView;
