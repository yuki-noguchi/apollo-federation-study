import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external"])

type Query {
  reviews: [Review]
}

# @keyでエンティティを特定するためのユニークな値を提供するフィールドを指定する
type Review @key(fields: "id") {
  id: ID!
  comment: String!
  book: Book!
}

type AddReviewMutationResponse {
  code: String!
  success: Boolean!
  message: String!
  review: Review
}

type Mutation {
  addReview(comment: String!, bookId: String!): AddReviewMutationResponse
}

# Book型を拡張
extend type Book @key(fields: "id") {
  id: ID! @external # bookのidは外部のスキーマのフィールドなので、@externalを指定
  reviews: [Review] # Bookに紐づくReview一覧を取得できるように定義
}

# Review一覧を取得できるようにしなくても良い場合には、↓のような定義も可能
# type Book @key(fields: "id", resolvable: false) {
#   id: ID! @external
# }
`;
