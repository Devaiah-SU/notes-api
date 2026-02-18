//Mongoose model for Category 
import mongoose from "mongoose";
interface Category {
    name: string; // The name of the category
    color: string; // An optional color for the category, with a default value if not provided
    createdAt: Date; // The date and time when the category was created, automatically set by Mongoose
}
const categorySchema = new mongoose.Schema<Category>({
    name: { // Define the 'name' field for the category
        type: String,
        required: true,
        unique: true
    },
    color : { // Define the 'color' field for the category with a default value
        type: String,
        default: "#808080"
    }, 
    createdAt: { // Define the 'createdAt' field for the category, automatically set to the current date and time when a new category is created
        type: Date,
        default: Date.now
    }
});
const Category = mongoose.model<Category>("Category", categorySchema); // Create a Mongoose model named 'Category' using the defined schema
export default Category; // Export the Category model to be used in other parts of the application