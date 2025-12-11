export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const searchInText = (text: string, query: string): boolean => {
  return normalizeString(text).includes(normalizeString(query));
};

export const searchInObject = (
  obj: any,
  query: string,
  fields: string[]
): boolean => {
  return fields.some((field) => {
    const value = obj[field];
    if (typeof value === "string") {
      return searchInText(value, query);
    }
    return false;
  });
};

export const filterBySearch = <T>(
  items: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!query.trim()) return items;

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return searchInText(value, query);
      }
      return false;
    })
  );
};
