var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/canvas_creations");

app.use(require("express-session")({
    secret: "Arya is the best pupper",
    resave: false,
    saveUninitialized: false
}));

// Schema
var Creation = require("./models/creation");
var Comment = require("./models/comment");
var User = require("./models/user");
//var seedDB = require("./seeds.js");
//seedDB();

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/creations", function(req, res) {
    Creation.find({}, function(err, allCreations) {
        if (err) {
            console.log(err);
        } else {
            res.render("creations/creations", {creations: allCreations});
        }
    });
});

app.get("/creations/new", function(req, res) {
    res.render("creations/new");
});

app.post("/creations", function(req, res) {
    Creation.create(req.body.creation, function(err, newCreation) {
        if (err) {
            console.log(err);
            res.redirect("/creations/new");
        } else {
            res.redirect("/creations");
        }
    });
});

app.get("/creations/:creation_id", function(req, res) {
    Creation.findById(req.params.creation_id).populate("comments").exec(function(err, foundCreation) {
        if (err) {
            console.log(err);
            res.redirect("/creations");
        } else {
            res.render("creations/show", {creation: foundCreation});
        }
    });
});

app.get("/creations/:creation_id/comments/new", function(req, res) {
    Creation.findById(req.params.creation_id, function(err, foundCreation) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {creation: foundCreation});
        }
    });
});

app.post("/creations/:creation_id/comments", function(req, res) {
    Creation.findById(req.params.creation_id, function(err, foundCreation) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    foundCreation.comments.push(newComment);
                    foundCreation.save();
                    res.redirect("/creations/" + req.params.creation_id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("THE CANVAS CREATIONS SERVER IS RUNNING!!!");
});