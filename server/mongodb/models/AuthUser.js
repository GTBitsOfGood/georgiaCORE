import mongoose from "mongoose";

const { Schema } = mongoose;

const AuthUserSchema = new Schema({
  email: String,
});

export default mongoose.models.AuthUser ?? mongoose.model("AuthUser", AuthUserSchema);