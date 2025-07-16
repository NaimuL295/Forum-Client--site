
import React from "react";
import { getPaginationRange } from "./Utility";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  if (!totalItems || !itemsPerPage || isNaN(totalItems) || isNaN(itemsPerPage)) return null;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-1 mt-6 text-sm mb-2">
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
