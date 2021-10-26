const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const axios = require("axios");

const typeDefs = gql`
  extend type Query {
    reviews: [Review]
  }

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
  Query: {
    reviews(_, args) {
      return reviews;
    },
  },
  Product: {
    reviews(product) {
      return reviews.filter((review) => review.product.upc === product.upc);
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

server.listen({ port: 4004 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

let reviews = [];
axios.get("http://localhost:3001/reviews").then((res) => {
  res.data.forEach((element) => {
    const newReview = {
      id: element.id,
      body: element.body,
      product: element.product,
    };

    reviews.push(newReview);
  });
});
