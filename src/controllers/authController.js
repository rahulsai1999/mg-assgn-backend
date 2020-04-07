import passport from "passport";
import jwt from "jsonwebtoken";
import moment from "moment";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();
const secret = process.env.SECRET;

const RegisterUser = (req, res) => {
  let { name, username, password } = req.body;
  User.find({ username: username }, (err, old_user) => {
    if (err) console.log(err);
    if (old_user.length != 0)
      res.json({ error: true, message: "User already exists" });
    else {
      User.register(
        new User({
          name: name,
          username: username,
          admin: false,
          loginEnabled: true,
          last_login: 0,
        }),
        password,
        (err, user) => {
          if (err) console.log(err);
          else
            res.json({ error: false, message: "User Registered", data: user });
        }
      );
    }
  });
};

const LoginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ error: true, token: "Invalid Credentials" });
    if (user) {
      if (user.loginEnabled) {
        const token = jwt.sign(
          { id: user._id, username: user.username },
          secret
        );
        User.findByIdAndUpdate(user._id, { last_login: moment().valueOf() });
        return res.json({ error: false, token: token });
      } else {
        return res.json({
          error: true,
          token: "Login Disabled; Contact Admin",
        });
      }
    }
  })(req, res, next);
};

export { LoginUser, RegisterUser };
