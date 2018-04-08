var express = require("express");
var router = express.Router();
var Creation = require("../models/creation");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/creations/:creation_id/comments/new", middleware.isLoggedIn, function(req, res) {
    Creation.findById(req.params.creation_id, function(err, foundCreation) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {creation: foundCreation});
        }
    });
});

router.post("/creations/:creation_id/comments", middleware.isLoggedIn, function(req, res) {
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
                    req.flash("success", "Successfully added your comment!");
                    res.redirect("/creations/" + req.params.creation_id);
                }
            });
        }
    });
});

router.get("/creations/:creation_id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", {creation_id: req.params.creation_id, comment: foundComment});
        }
    });
});

router.put("/creations/:creation_id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Successfully edited your comment!");
            res.redirect("/creations/" + req.params.creation_id);
        }
    });
});

router.delete("/creations/:creation_id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Successfully removed your comment!");
            res.redirect("/creations/" + req.params.creation_id);
        }
    });
});


module.exports = router;