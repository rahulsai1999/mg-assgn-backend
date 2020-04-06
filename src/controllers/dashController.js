import User from "../models/user";
import extractid from "../middleware/extract";

const getDash = (req, res) => {
  const x = extractid(req.headers);
  const { id } = x.body;
  User.findOne({ _id: id }, (err, user) => {
    if (err) console.log(err);
    if (user.admin) {
      User.find({ admin: false }, (err, found) => {
        if (err) console.log(err);
        else {
          res.json({ message: "Users retrieved", data: found });
        }
      });
    } else {
      res.json({ message: "User retrieved", data: user });
    }
  });
};

const disableUser = (req, res) => {
  const x = extractid(req.headers);
  const { id } = req.params;

  User.findOne({ _id: x.body.id }, (err, user) => {
    if (err) console.log(err);
    if (user.admin) {
      User.findByIdAndUpdate(id, { loginEnabled: false }, (err, user) => {
        if (err) console.log(err);
        else res.json({ message: `Login for user ${id} disabled` });
      });
    } else {
      res.json({ message: "Admin only" });
    }
  });
};

const enableUser = (req, res) => {
  const x = extractid(req.headers);
  const { id } = req.params;

  User.findOne({ _id: x.body.id }, (err, user) => {
    if (err) console.log(err);
    if (user.admin) {
      User.findByIdAndUpdate(id, { loginEnabled: true }, (err, user) => {
        if (err) console.log(err);
        else res.json({ message: `Login for user ${id} emabled` });
      });
    } else {
      res.json({ message: "Admin only" });
    }
  });
};

export { getDash, disableUser, enableUser };
