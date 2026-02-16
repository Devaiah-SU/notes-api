//Mongoose model for Category 
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: { // Define the 'name' field for the category
        type: String,
        required: true,
        unique: true
    },
    color : { // Define the 'color' field for the category with a default value
        type: String,
        default: "#808080"
    }
}, 
{
    timestamps: true // Enable automatic creation of 'createdAt' and 'updatedAt' fields
});
const Category = mongoose.model("Category", categorySchema); // Create a Mongoose model named 'Category' using the defined schema
export default Category; // Export the Category model to be used in other parts of the application