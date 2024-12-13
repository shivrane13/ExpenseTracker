const User = require("../models/user.model");

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    console.log("Data saved");
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(req, res) {
  const respose = {
    user: null,
    isAuth: false,
    message: "Invalid username password",
  };
  try {
    const data = await User.findUser(req.body.username, req.body.password);
    if (data) {
      req.session.user = data;
      req.session.isAuth = true;
      req.session.save((err) => {
        if (err) {
          console.log(err);
          res.json({ message: "session can not save" });
        } else {
          respose["user"] = data;
          respose["isAuth"] = true;
          respose["message"] = "Login Successfull";
          res.json(respose);
        }
      });
    } else {
      res.json(respose);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getLogedInUser(req, res) {
  try {
    res.json({
      user: req.session.user,
      isAuth: req.session.isAuth,
    });
  } catch (error) {
    console.log(error);
  }
}

async function logoutUser(req, res) {
  try {
    req.session.user = null;
    req.session.isAuth = null;
    req.session.save();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  getLogedInUser: getLogedInUser,
  logoutUser: logoutUser,
};
