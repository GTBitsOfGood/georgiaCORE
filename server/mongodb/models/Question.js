import mongoose from "mongoose";

const { Schema } = mongoose;

const QUESTION_TYPES = ["question", "url", "text"];

const QuestionSchema = new Schema({
  id: String,
  isRoot: { type: Boolean, default: false },
  question: String,
  type: { type: String, enum: QUESTION_TYPES },
  heading: String,
  bodyText: String,
  options: [
    {
      id: String,
      option: String,
      nextId: String,
      url: String,
    },
  ],
});

export default mongoose.models.Question ??
  mongoose.model("Question", QuestionSchema);
