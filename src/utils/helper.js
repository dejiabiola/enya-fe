export const calculatePagination = (perPage, total) => {
  return Math.ceil(total / perPage)
}
