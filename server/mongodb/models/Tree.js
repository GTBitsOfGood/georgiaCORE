import mongoose from "mongoose";

const { Schema } = mongoose;

const QUESTION_TYPES = ["question"];

const TreeSchema = new Schema({
  active: Boolean,
  title: String,
  thumbnailImage: Buffer,
  questions: [{
    id: String,
    question: String,
    type: { type: String, enum: QUESTION_TYPES },
    options: [
      {
        id: String,
        option: String,
        nextId: String,
        url: String,
      }
    ],
  }],
  // Metadata
  editedOn: Date, // updated internally by mongodb/actions
  // (will be updated when tree goes active => inactive, so will be wrong for the active tree)
  lastActive: Date, // updated internally by mongodb/actions
  author: String, // updated internally by mongodb/actions
});

export default mongoose.models.Tree ?? mongoose.model("Tree", TreeSchema);
