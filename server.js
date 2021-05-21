require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!!'
    }
}

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