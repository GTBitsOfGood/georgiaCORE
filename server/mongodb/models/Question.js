import mongoose from "mongoose";

const { Schema } = mongoose;

const QUESTION_TYPES = ["question"];

const QuestionSchema = new Schema({
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
});

export default mongoose.models.Question ?? mongoose.model("Question", QuestionSchema);
