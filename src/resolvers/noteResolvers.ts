import Note from "../models/Note.js"; // Import the Note model to interact with the notes collection in MongoDB

// Interface for creating a note
interface CreateNoteArgs {
  input: {
    title: string;
    content: string;
    category?: string;
  };
}

// Interface for updating a note
interface UpdateNoteArgs {
  _id: string;
  input: {
    title?: string;
    content?: string;
    category?: string;
    isPinned?: boolean;
  };
}

// Interface for deleting a note
interface DeleteNoteArgs {
  _id: string;
}

const noteResolvers = {

  // Resolver for fetching all notes
  notes: async ({ categoryId }: { categoryId?: string }) => {
  if (categoryId) {
    return await Note.find({ category: categoryId })
      .populate("category")
      .sort({ createdAt: -1 });
  }
  return await Note.find()
    .populate("category")
    .sort({ createdAt: -1 });
},

  // Resolver for fetching a single note by ID
  note: async ({ _id }: { _id: string }) => {
    return await Note.findById(_id)
      .populate("category"); // Populate category details
  },

  // Resolver for creating a new note
  createNote: async ({ input }: CreateNoteArgs) => {
    const newNote = new Note({
      title: input.title,
      content: input.content,
      category: input.category,
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await newNote.save(); // Save and return the created note
  },

  // Resolver for updating a note by ID
  updateNote: async ({ _id, input }: UpdateNoteArgs) => {
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
