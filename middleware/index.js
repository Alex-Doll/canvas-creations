var middlewareObj = {};
var Creation = require("../models/creation");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};

middlewareObj.checkCreationOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Creation.findById(req.params.creation_id, function(err, foundCreation) {
            if (err || !foundCreation) {
                console.log(err);
                res.redirect("/creations/" + req.params.creation_id);
            } else if (foundCreation.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You do not have permission to do that.");
                res.redirect("/creations/" + req.params.creation_id);
            }
        });
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                console.log(err);
                res.redirect("/creations/" + req.params.creation_id);
            } else if (foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You do not have permission to do that.");
                res.redirect("/creations/" + req.params.creation_id);
            }
        });
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;