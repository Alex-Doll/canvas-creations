var middlewareObj = {};
var Creation = require("../models/creation");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
};

middlewareObj.checkCreationOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Creation.findById(req.params.creation_id, function(err, foundCreation) {
            if (err || !foundCreation) {
                console.log(err);
                res.redirect("/creations");
            } else if (foundCreation.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("/creations");
            }
        });
    } else {
        res.redirect("/creations");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                console.log(err);
                res.redirect("/creations");
            } else if (foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("/creations");
            }
        });
    } else {
        res.redirect("/creations");
    }
};

module.exports = middlewareObj;