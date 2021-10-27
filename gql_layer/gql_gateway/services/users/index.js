const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const axios = require("axios");
const { UserApi } = require("../../util");

const typeDefs = gql`
  extend type Query {
    users: [User]
  }

  extend type Mutation {
    saveUser(id: ID!, name: String!, birthDate: String!): String
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    birthDate: String
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
  User: {
    async __resolveReference(object) {
      const users = await axios(UserApi)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      return users.find((user) => user.id === object.id);
    },
  },
  Mutation: {
    saveUser(_, args) {
      let data = JSON.stringify({
        id: args.id,
        name: args.name,
        birthDate: args.birthDate,
      });

      let config = {
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

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
