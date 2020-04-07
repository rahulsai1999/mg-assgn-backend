//dependencies
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import jwtStrategy from "./middleware/strategy";

//routes import
import mainRoutes from "./routes/mainRoutes";

//model import
import User from "./models/user";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dburl = process.env.DB_URL;

//utilities
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect(
  `mongodb://${dbuser}:${dbpass}@${dburl}`,
  { useNewUrlParser: true, useFindAndModify: false },
  (err) => {
    err ? console.log(err) : console.log("Connected to Database");
  }
);

//auth utilities
app.use(passport.initialize());
passport.use("local", new LocalStrategy(User.authenticate()));
passport.use("jwt", jwtStrategy);

//routes
app.get("/", (req, res) => {
  res.json({ message: "API Health OK" });
});

app.use(mainRoutes);

app.listen(port, () => {
  console.log("Running on port " + port);
});
