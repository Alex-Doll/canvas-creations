var express = require("express");
var router = express.Router();
var Creation = require("../models/creation");
var middleware = require("../middleware");

router.get("/creations", function(req, res) {
    Creation.find({}, function(err, allCreations) {
        if (err) {
            console.log(err);
        } else {
            res.render("creations/creations", {creations: allCreations});
        }
    });
});

router.get("/creations/new", middleware.isLoggedIn, function(req, res) {
    res.render("creations/new");
});

router.post("/creations", middleware.isLoggedIn, function(req, res) {
    Creation.create(req.body.creation, function(err, newCreation) {
        if (err) {
            console.log(err);
            res.redirect("/creations/new");
        } else {
            newCreation.author.id = req.user._id;
            newCreation.author.username = req.user.username;
            newCreation.save();
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

router.get("/creations/:creation_id/edit", middleware.checkCreationOwnership, function(req, res) {
    Creation.findById(req.params.creation_id, function(err, foundCreation) {
        if (err) {
            console.log(err);
        } else {
            res.render("creations/edit", {creation: foundCreation});
        }
    });
});

router.put("/creations/:creation_id", middleware.checkCreationOwnership, function(req, res) {
    Creation.findByIdAndUpdate(req.params.creation_id, req.body.creation, function(err, updatedCreation) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/creations/" + req.params.creation_id);
        }
    });
});

router.delete("/creations/:creation_id", middleware.checkCreationOwnership, function(req, res) {
    Creation.findByIdAndRemove(req.params.creation_id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/creations");
        }
    });
});


module.exports = router;