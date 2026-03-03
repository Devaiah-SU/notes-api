import Category from "../models/Category.js";// Import the Category model to interact with the categories collection in MongoDB
import { createCategorySchema } from "../utils/validation.js"; // Import validation schema for category
interface CreateCategoryArgs {
  input: {
    name: string;
    color?: string;
  };
}
const categoryResolvers = { // Define the resolvers for GraphQL queries and mutations related to categories
  categories: async () => { // Resolver for fetching all categories
    return await Category.find(); // Fetch and return all categories from the database
  },
  pagCategories: async ({page=1,limit=5}:{page?:number,limit?:number}) => { // Resolver for fetching limited number of categories in a page.
    const skip=(page-1)*limit;
    return await Category.find().skip(skip).limit(limit);
  },
  createCategory: async ({ input }:CreateCategoryArgs) => { // Resolver for creating a new category, takes an input object as an argument
    // Validate input using Joi before saving
    const { error } = createCategorySchema.validate(input);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newCategory = new Category({
      name: input.name,
      color: input.color || "#808080" 
    });
    return await newCategory.save();// Save the new category to the database and return the saved category
  }
};
export default categoryResolvers;// Export the categoryResolvers to be used in the GraphQL server setup in app.ts
