import React from "react";
import { Button, Box } from "@mui/material";

export const PagePagination = ({ currentPage, totalPages, postsPerPage }) => {
  const totalPageCount = Math.ceil(totalPages / postsPerPage);
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
      <Button onClick={handleNextPage} disabled={currentPage === totalPageCount}>
        Next
      </Button>
    </Box>
  );
};