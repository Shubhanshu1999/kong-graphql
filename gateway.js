require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway();

(async () => {
  const server = new ApolloServer({
    gateway,

    engine: false,
    subscriptions: false,
  });

  server.listen(4010).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
