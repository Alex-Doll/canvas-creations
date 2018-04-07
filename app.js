var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/canvas_creations");

// Schema
var Creation = require("./models/creation");

// var creations_array = [
//     {
//         title: "Creation 1",
//         image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         website_url: "https://www.google.com/"
//     },
//     {
//         title: "Creation 2",
//         image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         website_url: "https://www.google.com/"
//     },
//     {
//         title: "Creation 3",
//         image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         website_url: "https://www.google.com/"
//     },
//     {
//         title: "Creation 4",
//         image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         website_url: "https://www.google.com/"
//     },
//     {
//         title: "Creation 5",
//         image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         website_url: "https://www.google.com/"
//     }
// ];

// creations_array.forEach(function(creation) {
//     Creation.create(creation, function(err, newCreation) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Created New Creation: " + newCreation.title);
//         }
//     });
// });


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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("THE CANVAS CREATIONS SERVER IS RUNNING!!!");
});