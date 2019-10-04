var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  mongoose = require("mongoose"),
  Comment = require("./models/comment"),
  Campground = require("./models/campground"),
  User = require("./models/user"),
  seedDB = require("./seed_colt"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

// DATABASE CONFIGURATION
//mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
mongoose.connect(
  "mongodb+srv://alanchu:Pa$$w0rd@cluster0-vgrym.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); // Seed a new database

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Using the router modules
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Has Started!");
});
