export const bookSearchableFields = ["title", "author", "genre"];

export const bookFilterableFields = [
  "search",
  "category",
  "minPrice",
  "maxPrice",
];

export const bookRelationalFields: string[] = ["category"];

export const bookRelationalFieldMapper: { [key: string]: string } = {
  category: "category",
};
