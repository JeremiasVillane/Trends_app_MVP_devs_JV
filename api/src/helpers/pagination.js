const pagination = async (data, page, perPage) => {
  const startIndex = (page - 1) * perPage;
  const EndIndex = startIndex + perPage;

  const elePerPage = data.slice(startIndex, EndIndex);

  return {
    currentPage: page,
    totalPages: Math.ceil(data.length / perPage),
    data: elePerPage,
  };
};

module.exports = pagination;
