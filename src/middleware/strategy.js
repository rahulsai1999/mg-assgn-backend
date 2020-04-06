import dotenv from "dotenv";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/user";

dotenv.config();
const secret = process.env.SECRET;

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: secret,
};

const strategy = new JwtStrategy(options, (jwt_payload, done) => {
  User.findOne({ _id: jwt_payload.id }, (err, user) => {
    if (err) console.log(err);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

export default strategy;
