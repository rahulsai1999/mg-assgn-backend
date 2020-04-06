import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  admin: Boolean,
  loginEnabled: Boolean,
  last_login: Number,
});

userSchema.plugin(passportLocalMongoose);
const user = mongoose.model("user", userSchema);

export default user;
