require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectionString = process.env.MONGODB_URI;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(connectionString, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 4000 });
    })
    .then((res) => {
        console.log(`Listening at ${res.url}`)
    });