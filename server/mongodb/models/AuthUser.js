import mongoose from "mongoose";

const { Schema } = mongoose;

//Schema for an AuthUser, where AuthUser contains an email and a role
const AuthUserSchema = new Schema({
  email: String,
  role: String,
});

export default mongoose.models.AuthUser ??
  mongoose.model("AuthUser", AuthUserSchema);
