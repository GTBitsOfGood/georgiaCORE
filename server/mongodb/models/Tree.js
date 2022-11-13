import mongoose from "mongoose";

const { Schema } = mongoose;

const QUESTION_TYPES = ["question", "url", "text", "error"];

const TreeSchema = new Schema({
  active: Boolean,
  title: String,
  thumbnailImage: Buffer,
  questions: [
    {
      id: String,
      isRoot: { type: Boolean, default: false },
      question: String,
      type: { type: String, enum: QUESTION_TYPES },
      heading: String,
      bodyText: String,
      linkName: { type: String, default: null },
      url: { type: String, default: null },
      options: [
        {
          id: String,
          option: String,
          icon: String,
          nextId: String,
          supportingText: String,
        },
      ],
    },
  ],
  reactFlowState: Object,
  // Metadata
  editedOn: Date, // updated internally by mongodb/actions
  // (will be updated when tree goes active => inactive, so will be wrong for the active tree)
  lastActive: Date, // updated internally by mongodb/actions
  author: String, // updated internally by mongodb/actions
});

export default mongoose.models.Tree ?? mongoose.model("Tree", TreeSchema);
