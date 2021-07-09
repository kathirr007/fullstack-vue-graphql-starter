const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

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
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.error(err));

// Create Appollo/GraphQL Server using typeDefs, resolvers and context Object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
