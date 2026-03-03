import express from 'express'; // Import the Express framework to create the server
import { graphqlHTTP } from 'express-graphql'; // Import the express-graphql middleware to handle GraphQL requests
import { buildSchema } from 'graphql'; // Import the buildSchema function to create a GraphQL schema
import categoryResolvers from './resolvers/categoryResolvers.js'; // Import the category resolvers to handle GraphQL queries and mutations related to categories
import noteResolvers from './resolvers/noteResolvers.js';// Import the note resolvers to handle GarphQL queries and mutations related to notes.
import fs from 'fs'; // Import the file system module to read the GraphQL schema
import path from 'path'; // Import the path module to handle file paths
import { fileURLToPath } from 'url'; // Import the fileURLToPath function to convert file URLs to file paths
const app = express(); // Create an instance of the Express application
import { connectDB } from "./config/db.js"; // Import the connectDB function to establish a connection to MongoDB
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the current directory path
// Build the GraphQL schema by reading the schema definition from a file.
const schema = buildSchema(
  fs.readFileSync(
    path.join(__dirname, "./graphql/schemas/schema.graphql"),
    "utf8" 
  )
);
app.use('/graphql', graphqlHTTP({ // Set up the /graphql endpoint to handle GraphQL requests
  schema:schema, // Use the defined GraphQL schema
  rootValue: {
  ...categoryResolvers,
  ...noteResolvers,
},// Use the category resolvers and note resolvers to handle queries and mutations for category and notes
  graphiql: true,
}) );
connectDB(); // Call the connectDB function to connect to MongoDB
app.get('/', (req, res) => {
  res.send('<h1><center>NOTES API</center></h1>'); // Define a route for the root URL that sends a simple HTML response
});
app.listen(4000, () => {
console.log('Server is running on http://localhost:4000/graphql'); // Start the server and listen on port 4000
});
