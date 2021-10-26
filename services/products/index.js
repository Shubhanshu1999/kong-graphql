const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const axios = require("axios");

const typeDefs = gql`
  extend type Query {
    products: [Product]
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`;

const resolvers = {
  Query: {
    products(_, args) {
      return products;
    },
  },
  //   Product: {
  //     __resolveReference(object) {
  //       return products.find((product) => product.upc === object.upc);
  //     },
  //   },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

let products = [];
axios.get("http://localhost:3000/products").then((res) => {
  res.data.forEach((element) => {
    const newProduct = {
      upc: element.upc,
      name: element.name,
      price: element.price,
      weight: element.weight,
    };

    products.push(newProduct);
  });

  console.log(products);
});
