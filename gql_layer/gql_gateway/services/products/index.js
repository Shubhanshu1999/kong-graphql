const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const axios = require("axios");
const { product_api } = require("../../util");

const typeDefs = gql`
  extend type Query {
    topProducts(first: Int = 5): [Product]
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`;

const resolvers = {
  Product: {
    async __resolveReference(object) {
      const products = await axios(product_api)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return products.find((product) => product.upc === object.upc);
    },
  },
  Query: {
    async topProducts(_, args) {
      const products = await axios(product_api)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return products.splice(0, args.first);
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

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
