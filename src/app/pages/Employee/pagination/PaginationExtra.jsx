// import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';

// const PaginationExtra = (props) => {
//     const { data } = props;
    

//   const [itemOffset, setItemOffset] = useState(0);

//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = data.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(data.length / itemsPerPage);
//     const itemsPerPage = 6;

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % data.length;
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
    
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// };

// export default PaginationExtra;