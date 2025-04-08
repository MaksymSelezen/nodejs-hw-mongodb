const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  const parsedNumber = parseInt(number);

  if (!isString || Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

//

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
