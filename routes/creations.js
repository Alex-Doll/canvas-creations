var express = require("express");
var router = express.Router();
var Creation = require("../models/creation");

router.get("/creations", function(req, res) {
    Creation.find({}, function(err, allCreations) {
        if (err) {
            console.log(err);
        } else {
            res.render("creations/creations", {creations: allCreations});
        }
    });
});

router.get("/creations/new", isLoggedIn, function(req, res) {
    res.render("creations/new");
});

router.post("/creations", isLoggedIn, function(req, res) {
    Creation.create(req.body.creation, function(err, newCreation) {
        if (err) {
            console.log(err);
            res.redirect("/creations/new");
        } else {
            newCreation.author.id = req.user._id;
            newCreation.author.username = req.user.username;
            newCreation.save()
            res.redirect("/creations");
        }
    });
});

router.get("/creations/:creation_id", function(req, res) {
    Creation.findById(req.params.creation_id).populate("comments").exec(function(err, foundCreation) {
        if (err) {
            console.log(err);
            res.redirect("/creations");
        } else {
            res.render("creations/show", {creation: foundCreation});
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;