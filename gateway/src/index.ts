import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: "auhtor",
        url: "http://localhost:4000/",
      },
      {
        name: "reviews",
        url: "http://localhost:4001/",
      },
      {
        name: "book",
        url: "http://localhost:4002/graphql",
      },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

startStandaloneServer(server, {
  listen: { port: 5000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
