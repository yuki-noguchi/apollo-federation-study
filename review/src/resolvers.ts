import type { Review, Resolvers } from "./generated/graphql";

const reviews: Review[] = [
  {
    id: "1",
    comment: "",
    book: {
      id: "1",
    },
  },
];

export const resolvers: Resolvers = {
  Query: {
    reviews: () => reviews,
  },
  Review: {
    __resolveReference: ({ id }) => {
      return reviews.find((review) => review.id === id);
    },
  },
  Book: {
    reviews: (book) => reviews.filter((review) => review.book.id === book.id),
  },
  Mutation: {
    addReview: (_, { comment, bookId }) => {
      const lastId = Number.parseInt(reviews[reviews.length - 1].id);

      const newReview = {
        id: (lastId + 1).toString(),
        comment,
        book: {
          id: bookId,
        },
      };

      reviews.push(newReview);
      return {
        code: "ok",
        message: "success",
        success: true,
        review: newReview,
      };
    },
  },
};
