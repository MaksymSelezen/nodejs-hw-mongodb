const parseType = (type) => {
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
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
