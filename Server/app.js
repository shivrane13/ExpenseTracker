const express = require("express");
app = express();
const core = require("cors");
app.use(core({ origin: "http://localhost:3001", credentials: true }));

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const expenceRoutes = require("./routes/expence.routes.js");
const incomeRoutes = require("./routes/income.routes.js");
const userRoutes = require("./routes/user.routes.js");

const sessionStore = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gaurav",
  database: "expencetracker",
  createDatabaseTable: true,
});

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use("/user", userRoutes);

app.use(function (req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(403).json({ message: "Acccess Denied. Please log in" });
  }
});

app.use("/expense", expenceRoutes);
app.use("/income", incomeRoutes);

app.listen(3000, () => {
  console.log("Server Started on port 3000");
});
