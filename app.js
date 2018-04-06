var express = require("express");
var app = express();

app.set("view engine", "ejs");



var creations_array = [
    {
        title: "Creation 1",
        image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        website_url: "https://www.google.com/"
    },
    {
        title: "Creation 2",
        image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        website_url: "https://www.google.com/"
    },
    {
        title: "Creation 3",
        image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        website_url: "https://www.google.com/"
    }
];


app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/creations", function(req, res) {
    res.render("creations", {creations: creations_array});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("THE CANVAS CREATIONS SERVER IS RUNNING!!!");
});