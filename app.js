var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/canvas_creations");

app.use(require("express-session")({
    secret: "Arya is the best pupper",
    resave: false,
    saveUninitialized: false
}));

// Schema
//var Creation = require("./models/creation");
//var Comment = require("./models/comment");
var User = require("./models/user");
//var seedDB = require("./seeds.js");
//seedDB();

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


var indexRoutes = require("./routes/index");
var creationsRoutes = require("./routes/creations");
var commentsRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

app.use(indexRoutes);
app.use(creationsRoutes);
app.use(commentsRoutes);
app.use(authRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("THE CANVAS CREATIONS SERVER IS RUNNING!!!");
});