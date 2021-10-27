const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const axios = require("axios");
const { api } = require("../../util");
const { readFileSync } = require("fs");

const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!
    body: String
    product: Product
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Product: {
    async reviews(product) {
      const reviews = await axios(`${api}/reviews`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return reviews.filter((review) => review.product.upc === product.upc);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
