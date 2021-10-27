const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const axios = require("axios");
const { review_api, UserApi } = require("../../util");
const { readFileSync } = require("fs");

const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!
    body: String
    author: User @provides(fields: "username")
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String @external
    reviews: [Review]
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Review: {
    author(review) {
      return { __typename: "User", id: review.authorID };
    },
  },
  User: {
    async reviews(user) {
      const reviews = await axios(review_api)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return reviews.filter((review) => review.authorID === user.id);
    },
    async username(user) {
      const usernames = await axios(UserApi)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      const found = usernames.find((username) => username.id === user.id);
      return found ? found.username : null;
    },
  },
  Product: {
    async reviews(product) {
      const reviews = await axios(review_api)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return reviews.filter((review) => review.product.upc == product.upc);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
