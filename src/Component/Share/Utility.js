export   const getPaginationRange = (currentPage, totalPages) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let previousPage = 0;

  if (!currentPage || !totalPages || totalPages < 1) return [];

  for (let i = 1; i <= totalPages; i++) {
  
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