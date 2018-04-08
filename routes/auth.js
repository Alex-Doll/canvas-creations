var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/register", function(req, res) {
    res.render("auth/register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Your user registration was successful!");
                res.redirect("/creations");
            });
        }
    });
});

router.get("/login", function(req, res) {
    res.render("auth/login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/creations",
        failureRedirect: "/login"
    }), function(req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You successfully logged out.");
    res.redirect("/creations");
});

module.exports = router;