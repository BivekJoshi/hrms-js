// import React from 'react';
// import { Button, List, Pagination } from '@mui/material';

// const PaginationItem = ({ number, currentPage, paginate }) => (
//   <Button color="secondary" onClick={() => paginate(number)} disabled={currentPage === number}>
//     <List>{number}</List>
//   </Button>
// );

// const PageItem = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//       pageNumbers.push(i);
//     }

//   return (
//     <Pagination count={pageNumbers.length} showFirstButton showLastButton spacing={2} page={currentPage} onChange={(event, page) => paginate(page)}>
//         {
//             pageNumbers.map((number) => (
//                 <PaginationItem key={number} number={number} currentPage={currentPage} paginate={paginate} />                
//             ))
//         }
//     </Pagination>

//   );
// };



// export default PageItem;