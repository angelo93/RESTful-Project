const PORT = process.env.PORT || 3000;
require("dotenv").config();
// NPM IMPORTS
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override");

// Model Imports
var Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

// Route imports
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

// CONNECT TO DATABASE
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

mongoose.set("useFindAndModify", false);

// DEFAULTS
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();    // Seed the database

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Main portfolio project!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass user info to routes
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ================================================================== //
// | ROUTES                                                         | //
// ================================================================== //

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// 404 PAGE //
// app.get("*", function(req, res){
//     res.send("404 Page Not Found");
// });

// =====================================================================

//  PORT NUMBER HOSTING THE SERVER //
app.listen(PORT, process.env.IP, function() {
  console.log("The YelpCamp server has been initialized");
});
