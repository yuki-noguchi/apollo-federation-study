import type { Author, Resolvers } from "./generated/graphql";

const authors: Author[] = [
  {
    id: "1",
    name: "村上春樹",
  },
];

export const resolvers: Resolvers = {
  Query: {
    authors: () => authors,
  },
  Author: {
    __resolveReference: ({ id }) => {
      return authors.find((author) => author.id === id);
    },
  },
  Mutation: {
    addAuthor: (_, { name }) => {
      const lastId = Number.parseInt(authors[authors.length - 1].id);

      const newAuthor = {
        id: (lastId + 1).toString(),
        name,
      };

      authors.push(newAuthor);
      return {
        code: "ok",
        message: "success",
        success: true,
        author: newAuthor,
      };
    },
  },
};
