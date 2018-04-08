var express = require("express");
var router = express.Router();
var Creation = require("../models/creation");

router.get("/creations", function(req, res) {
    console.log(req.user);
    Creation.find({}, function(err, allCreations) {
        if (err) {
            console.log(err);
        } else {
            res.render("creations/creations", {creations: allCreations});
        }
    });
});

router.get("/creations/new", function(req, res) {
    res.render("creations/new");
});

router.post("/creations", function(req, res) {
    Creation.create(req.body.creation, function(err, newCreation) {
        if (err) {
            console.log(err);
            res.redirect("/creations/new");
        } else {
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


module.exports = router;