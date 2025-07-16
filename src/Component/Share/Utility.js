export function getPaginationPages(totalItems, itemsPerPage) {
  if (!totalItems || !itemsPerPage) return [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}