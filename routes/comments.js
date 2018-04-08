var express = require("express");
var router = express.Router();
var Creation = require("../models/creation");
var Comment = require("../models/comment");

router.get("/creations/:creation_id/comments/new", isLoggedIn, function(req, res) {
    Creation.findById(req.params.creation_id, function(err, foundCreation) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {creation: foundCreation});
        }
    });
});

router.post("/creations/:creation_id/comments", isLoggedIn, function(req, res) {
    Creation.findById(req.params.creation_id, function(err, foundCreation) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundCreation.comments.push(newComment);
                    foundCreation.save();
                    res.redirect("/creations/" + req.params.creation_id);
                }
            });
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