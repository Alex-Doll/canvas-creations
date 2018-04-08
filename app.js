var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/canvas_creations");

// Schema
var Creation = require("./models/creation");
var Comment = require("./models/comment");
//var seedDB = require("./seeds.js");
//seedDB();


app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/creations", function(req, res) {
    Creation.find({}, function(err, allCreations) {
        if (err) {
            console.log(err);
        } else {
            res.render("creations", {creations: allCreations});
        }
    });
});

app.get("/creations/new", function(req, res) {
    res.render("new");
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
            res.render("show", {creation: foundCreation});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("THE CANVAS CREATIONS SERVER IS RUNNING!!!");
});