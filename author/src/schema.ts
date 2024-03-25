import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

type Query {
  authors: [Author]
}

# @keyでエンティティを特定するためのユニークな値を提供するフィールドを指定する
type Author @key(fields: "id") {
  id: ID!
  name: String!
}

type AddAuthorMutationResponse {
  code: String!
  success: Boolean!
  message: String!
  author: Author
}

type Mutation {
  addAuthor(name: String!): AddAuthorMutationResponse
}
`;
