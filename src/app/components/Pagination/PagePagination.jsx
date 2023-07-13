import React from "react";
import { Button, List, Pagination } from "@mui/material";

const PaginationItem = ({ number, currentPage }) => (
  <Button
    color="secondary"
    onClick={() => paginate(number)}
    disabled={currentPage === number}
  >
    <List>{number}</List>
  </Button>
);

export const   PagePagination = ({
  
  PostsPerPage,
  TotalPosts,
  Paginate,
  CurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(TotalPosts / PostsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination
      count={pageNumbers.length}
      // showFirstButton
      // showLastButton
      spacing={2}
      page={CurrentPage}
      onChange={(event, page) => Paginate(page)}
      siblingCount={1} 
      boundaryCount={1}
      color="primary"
    >
      {pageNumbers.map((number) => (
        <PaginationItem
          key={number}
          number={number}
          currentPage={CurrentPage}
          paginate={Paginate}
        />
      ))}
    </Pagination>
  );
};
