const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// Import typeDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

// Import Environment variables and mongoose models
require("dotenv").config({ path: "variables.env" });
const User = require("./models/user");
const Post = require("./models/post");
const resolvers = require("./resolvers");

// Connect to MongoDB Database
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.error(err));

// Verify JWT token passed from client
const getUser = async (token) => {
  if (token) {
    try {
      // let user = await jwt.verify(token, process.env.SECRET);
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError("Your session has ended. Please sign-in again.");
    }
  }
};

// Create Appollo/GraphQL Server using typeDefs, resolvers and context Object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => ({
    name: error.name,
    message: error.message,
  }),
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return {
      User,
      Post,
      currentUser: await getUser(token),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
