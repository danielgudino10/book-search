const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./path-to-your-graphql-schema'); // Replace with the path to your GraphQL schema
const resolvers = require('./path-to-your-resolvers'); // Replace with the path to your resolvers

const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of Apollo Server and apply it as middleware to the Express server
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});