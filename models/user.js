import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a name"],
    match: [
      /^[a-zA-Z0-9]+$/,
      "Username can only contain alphanumeric characters",
    ],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema)

export default User;
