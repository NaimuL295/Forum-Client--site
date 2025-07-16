// import React from "react";

// const generatePagination = (currentPage, totalPages) => {
//   const pages = [];

//   if (totalPages <= 7) {
//     // Show all pages
//     for (let i = 1; i <= totalPages; i++) pages.push(i);
//   } else {
//     pages.push(1);

//     if (currentPage > 3) pages.push("...");

//     const start = Math.max(2, currentPage - 1);
//     const end = Math.min(totalPages - 1, currentPage + 1);

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     if (currentPage < totalPages - 2) pages.push("...");

//     pages.push(totalPages);
//   }

//   return pages;
// };

// const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const pages = generatePagination(currentPage, totalPages);

//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex justify-center items-center gap-1 mt-6 text-sm">
//       {/* Prev */}
//       ``
//       <button
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//         className="px-2 py-1 border rounded disabled:opacity-50"
//       >
//         ←
//       </button>
//    {pages.map((page, idx) =>
//         page === "..." ? (
//           <span key={idx-1} className="px-2">
//             ...
//           </span>
//         ) : (
//           <button
//             key={idx}
//             onClick={() => onPageChange(page)}
//             className={`px-3 py-1 border rounded ${
//               currentPage === page ? "bg-blue-500 text-white" : ""
//             }`}
//           >
//             {page}
//           </button>
//         )
//       )}
   

//       {/* Next */}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//         className="px-2 py-1 border rounded disabled:opacity-50"
//       >
//         →
//       </button>
//     </div>
//   );
// };

// export default Pagination;





// components/Pagination.jsx
import React from "react";

const getPaginationRange = (currentPage, totalPages) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let previousPage = 0;

  if (!currentPage || !totalPages || totalPages < 1) return [];

  for (let i = 1; i <= totalPages; i++) {
    // Always show: first, last, and ±delta around currentPage
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (previousPage) {
      if (i - previousPage === 2) {
        rangeWithDots.push(previousPage + 1);
      } else if (i - previousPage > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    previousPage = i;
  }

  return rangeWithDots;
};


const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  if (!totalItems || !itemsPerPage || isNaN(totalItems) || isNaN(itemsPerPage)) return null;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-1 mt-6 text-sm">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        ←
      </button>

      {/* Page Buttons */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2">...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 border rounded ${currentPage === p ? "bg-blue-500 text-white" : ""}`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
