import Note from "../models/Note.js"; // Import the Note model to interact with the notes collection in MongoDB
import mongoose from "mongoose";
import { FetchSingleNote,createNoteSchema, updateNoteSchema, deleteNoteSchema, FetchNotesByCategory } from "../utils/validation.js"; // Import Joi validation schemas
// Interface for creating a note
interface CreateNoteArgs {
  input: {
    title: string;
    content: string;
    categoryID?: string;
  };
}
// Interface for updating a note
interface UpdateNoteArgs {
  _id: string;
  input: {
    title?: string;
    content?: string;
    categoryID?: string;
    isPinned?: boolean;
  };
}
// Interface for deleting a note
interface DeleteNoteArgs {
  _id: string;
}
// Interface for notes by category
interface NotesByCategoryArgs {
  categoryId: string;
}
const noteResolvers = {
  // Resolver for fetching all notes
  notes: async ({ categoryId }: { categoryId?: string }) => {
    if (categoryId) {
    const { error } = FetchNotesByCategory.validate({ _id: categoryId });
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await Note.find({ category: categoryId })
      .populate("category")
      .sort({ createdAt: -1 });
  }
  return await Note.find()
    .populate("category")
    .sort({ createdAt: -1 });
  },
  //Resolver for fetching all notes under a specific category
  notesCategory: async ({ categoryId }: { categoryId: string }) => {
  const { error } = FetchNotesByCategory.validate({ _id: categoryId });

  if (error) {
    throw new Error(error.details[0].message);
  }

  return await Note.find({
    category: new mongoose.Types.ObjectId(categoryId)
  })
    .populate("category")
    .sort({ createdAt: -1 });
},

  // Resolver for fetching a single note by ID
  note: async ({ _id }: { _id: string }) => {
    const{error}=FetchSingleNote.validate({_id});
    if (error)
    {
      throw new Error(error.details[0].message);
    }
    return await Note.findById(_id)
      .populate("category"); // Populate category details
  },
  //resolver for fetching pinned notes 
  pinnednotes: async () => {
  return await Note.find({ isPinned: true })
    .populate("category");
},
  // Resolver for creating a new note
  createNote: async ({ input }: CreateNoteArgs) => {
    // Validate input using Joi before saving to database
    const { error } = createNoteSchema.validate(input);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newNote = new Note({
      title: input.title,
      content: input.content,
      category: input.categoryID,
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await newNote.save().then(note =>
    note.populate("category")
);; // Save and return the created note
  },
  // Resolver for updating a note by ID
  updateNote: async ({ _id, input }: UpdateNoteArgs) => {
    //validating note id
     const idValidation = FetchSingleNote.validate({ _id });
    if (idValidation.error) {
      throw new Error(idValidation.error.details[0].message);
  }
    // Validate update input using Joi
    const { error } = updateNoteSchema.validate(input);
    if (error) {
      throw new Error(error.details[0].message);
    }

    return await Note.findByIdAndUpdate(
      _id,
      {
        ...input,
        updatedAt: new Date(),
      },
      { new: true } // Return updated document
    ).populate("category");
  },
  // Resolver for deleting a note by ID
  deleteNote: async ({ _id }: DeleteNoteArgs) => {
    // Validate note ID before attempting deletion
    const { error } = deleteNoteSchema.validate({ _id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const deleted = await Note.findByIdAndDelete(_id);
    if (!deleted) {
      return {
        success: false,
        message: "Note not found",
      };
    }
    return {
      success: true,
      message: "Note deleted successfully",
    };
  }
};
export default noteResolvers; // Export noteResolvers to be used in app.ts
