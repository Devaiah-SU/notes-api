import mongoose from "mongoose"; // Import Mongoose to connect to MongoDB
import dotenv from "dotenv"; // Load environment variables from .env file
dotenv.config(); // Connect to MongoDB using the connection string from environment variables
async function connectDB() { // function to connect to MongoDB

console.log('MONGO_URI:', process.env.MONGO_URI); // Log the MONGO_URI to verify it's being read correctly

mongoose.connect(process.env.MONGO_URI as string)  // Connect to MongoDB using the connection string from environment variables
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
})
}
export { connectDB }; // Export the connectDB function to be used in app.ts
