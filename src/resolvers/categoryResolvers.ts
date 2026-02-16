import Category from "../models/Category.js";// Import the Category model to interact with the categories collection in MongoDB
const categoryResolvers = { // Define the resolvers for GraphQL queries and mutations related to categories
  categories: async () => { // Resolver for fetching all categories
    return await Category.find(); // Fetch and return all categories from the database
  },

  createCategory: async ({ input }: any) => { // Resolver for creating a new category, takes an input object as an argument
    const newCategory = new Category({
      name: input.name,
      color: input.color || "#808080" 
    });

    return await newCategory.save();// Save the new category to the database and return the saved category
  }
};

export default categoryResolvers;// Export the categoryResolvers to be used in the GraphQL server setup in app.ts
