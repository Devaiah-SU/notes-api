import mongoose from "mongoose";
interface Note
{ 
    _id:mongoose.Types.ObjectId
    title: string;
    content: string;
    category?: mongoose.Types.ObjectId;   // Optional reference to Category
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}
const noteSchema = new mongoose.Schema<Note>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",   // Must match your Category model name
      required: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    createdAt:
    {
        type:Date,
        default: Date.now
    },
    updatedAt:
    {
        type:Date,
        default: Date.now
    }
  });
const Note = mongoose.model<Note>("Note", noteSchema); //create mongoose model named "Note" with noteSchema
export default Note; // Note model to be used in other parts of the program
