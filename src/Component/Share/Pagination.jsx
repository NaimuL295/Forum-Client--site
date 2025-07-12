

const Pagination = ({ currentPage, totalPages, onPageChange = () => {} }) => {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  console.log("Pagination component rendered");

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 mt-4 w-max mx-auto px-2 items-center text-xs">
        {/* Prev */}
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2 py-[2px] border rounded"
          >
            ← Prev
          </button>
        )}

      
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-[2px] border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page }
          </button>
        ))}

        {/* Next */}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2 py-[2px] border rounded"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;

