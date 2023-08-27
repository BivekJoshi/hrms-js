// import React from "react";
// import { Button, List, Pagination } from "@mui/material";

// const PaginationItem = ({ number, currentPage }) => (
//   <Button
//     color="secondary"
//     onClick={() => paginate(number)}
//     disabled={currentPage === number}
//   >
//     <List>{number}</List>
//   </Button>
// );

// export const   PagePagination = ({
  
//   PostsPerPage,
//   TotalPosts,
//   Paginate,
//   CurrentPage,
// }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(TotalPosts / PostsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <Pagination
//       count={pageNumbers.length}
//       spacing={2}
//       page={CurrentPage}
//       onChange={(event, page) => Paginate(page)}
//       siblingCount={1} 
//       boundaryCount={1}
//       color="primary"
//     >
//       {pageNumbers.map((number) => (
//         <PaginationItem
//           key={number}
//           number={number}
//           currentPage={CurrentPage}
//           paginate={Paginate}
//         />
//       ))}
//     </Pagination>
//   );
// };




import React from "react";
import { Button, Box } from "@mui/material";

export const PagePagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Button
          key={page}
          variant={currentPage === page ? "contained" : "outlined"}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </Button>
      {renderPageButtons()}
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </Box>
  );
};