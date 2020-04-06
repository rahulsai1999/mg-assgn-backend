import passport from "passport";

const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.json({ message: "Invalid Credentials" });
    }
    if (user) {
      next();
    }
  })(req, res, next);
};

export default isLoggedIn;
