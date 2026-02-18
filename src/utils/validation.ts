import Joi from "joi";
//validation for category.
const hexColorPattern = /^#([0-9A-Fa-f]{6})$/; 
export const createCategorySchema=Joi.object
(
    {
    name: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Category name is required", // the name field requires an input
      "any.required": "Category name is required", // the query requires the name field
    }),
    color: Joi.string()
    .pattern(hexColorPattern)
    .optional()
    .messages({
      "string.pattern.base": "Color must be a valid hex code (e.g. #FF5733)",// valid hexadecimal color code which must have atleast 6 characters and begin with # only
    }
)
    }
)
//Validation for notes
const objectIdPattern = /^[0-9a-fA-F]{24}$/; //regular expression for objectID
export const FetchSingleNote=Joi.object(
    {
        _id:Joi.string()
        .pattern(objectIdPattern)
        .required()
        .messages({
            "any.required": "Note ID is required",
            "string.empty": "Note ID cannot be empty",
            "string.pattern.base": "Invalid note ID",
        })
    }
)
export const FetchNotesByCategory=Joi.object(
    {
        _id:Joi.string()
        .pattern(objectIdPattern)
        .required()
        .messages({
            "any.required": "Category ID is required",
            "string.empty": "Category ID cannot be empty",
            "string.pattern.base": "Invalid Category ID",
        })
    }
)
export const createNoteSchema=Joi.object
(
    {
        title: Joi.string()
        .trim()
        .max(100)
        .required()
        .messages({
        "any.required": "Title is required", //Title field is required
        "string.empty": "Title cannot be empty", //Title field cannot be empty
        "string.max": "Title cannot exceed 100 characters", //Cannot exceed maximun of 100 characters
    }),
        content: Joi.string()
        .trim()
        .required()
        .messages({
        "any.required": "Content is required", //Content field is required
        "string.empty": "Content cannot be empty", // Content field cannot be empty
    }),
        categoryID: Joi.string()
        .pattern(objectIdPattern)
        .optional()
        .messages({
            "string.pattern.base": "Invalid Object ID" // requires on objectID which is 24 characters long
        })
    }
)
export const updateNoteSchema = Joi.object
(
    {
        title: Joi.string()
        .trim()
        .max(100)
        .optional()
        .messages({
        "string.max": "Title cannot exceed 100 characters",
    }),

        content: Joi.string().trim().optional(),    
        categoryID: Joi.string()
        .pattern(objectIdPattern)
        .optional()
        .messages({
        "string.pattern.base": "Invalid category ID", //Inavlid category ID
    }),

        isPinned: Joi.boolean().optional(),
});
export const deleteNoteSchema = Joi.object({
        _id: Joi.string()
        .pattern(objectIdPattern)
        .required()
        .messages({
        "any.required": "Note ID is required",
        "string.empty": "Note ID cannot be empty",
        "string.pattern.base": "Invalid note ID",
    }),
});
