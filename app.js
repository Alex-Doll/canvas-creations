// =================
// PACKAGE INCLUDES
// =================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");


// ===============
// DATABASE SETUP
// ===============
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/canvas_creations");
// mongoose.connect("mongodb://Rosco1010:password@ds239359.mlab.com:39359/canvas-creations");


// =================
// EXPRESS SETTINGS
// =================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Arya is the best pupper",
    resave: false,
    saveUninitialized: false
}));


// =============
// SCHEMA SETUP
// =============
var User = require("./models/user");
//var Creation = require("./models/creation");
//var Comment = require("./models/comment");
//var seedDB = require("./seeds.js");
//seedDB();


// =====================
// AUTHENTICATION SETUP
// =====================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


function setLocals(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
}
app.use(setLocals);


// ===============
// EXPRESS ROUTES
// ===============
var indexRoutes = require("./routes/index");
var creationsRoutes = require("./routes/creations");
var commentsRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

app.use(indexRoutes);
app.use(creationsRoutes);
app.use(commentsRoutes);
app.use(authRoutes);


// =============
// SERVER START
// =============
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("THE CANVAS CREATIONS SERVER IS RUNNING!!!");
});