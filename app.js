const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");

// Set our views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/css", express.static("assets/css"));
app.use("/javascript", express.static("assets/javascript"));
app.use("/images", express.static("assets/images"));

// Mongo access
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.error(`Error: ${err}`));

// Implement Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup our session
const session = require("express-session");
app.use(
  session({
    secret: "any salty secret here",
    resave: true,
    saveUninitialized: false,
  })
);

// Setup flash notification
const flash = require("connect-flash");
app.use(flash());
app.use("/", (req, res, next) => {
  // Setting default locals
  res.locals.pageTitle = "Untitled";

  // Passing along flash message
  res.locals.flash = req.flash();
  res.locals.formData = req.session.formData || {};
  req.session.formData = {};

  next();
});

// Our routes
const routes = require("./routes.js");
app.use("/", routes);

// Start our server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
