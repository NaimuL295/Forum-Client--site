const SortControl = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        className={`px-3 py-1 mr-2 rounded ${sortBy === 'newest' ? 'bg-blue-500 ' : '  bg-white dark:bg-gray-800 dark:text-white'}`}
        onClick={() => setSortBy('newest')}
      >
        Newest
      </button>
      <button
        className={`px-3 py-1 rounded ${sortBy === 'popular' ? 'bg-blue-500 ' : "bg-white dark:bg-gray-800 dark:text-white"}`}
        onClick={() => setSortBy('popular')}
      >
        Popular
      </button>
    </div>
  );
};
export default SortControl;
