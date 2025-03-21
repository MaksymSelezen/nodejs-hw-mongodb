const parseContactType = (type) => {
  if (typeof type !== 'string') return;

  const isValidType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isValidType(type)) return type;
};

//

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

//

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
