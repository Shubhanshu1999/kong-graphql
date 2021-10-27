const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const axios = require("axios");
const { UserApi } = require("../../util");

const typeDefs = gql`
  extend type Query {
    users: [User]
  }

  extend type Mutation {
    saveUser(
      id: ID!
      name: String!
      address: String!
      dob: String!
      email: String!
    ): String
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    address: String
    dob: String
    email: String
  }
`;

const resolvers = {
  Query: {
    users(_, args) {
      return axios
        .get(`${UserApi}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  },
  Mutation: {
    saveUser(_, args) {
      var data = JSON.stringify({
        id: args.id,
        name: args.name,
        address: args.address,
        dob: args.dob,
        email: args.email,
      });

      var config = {
        method: "post",
        url: UserApi,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      return "User saved";
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
