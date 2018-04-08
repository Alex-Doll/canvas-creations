var mongoose = require("mongoose");
var Creation = require("./models/creation");
var Comment = require("./models/comment");


var creation_data = [
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
    },
    {
        title: "Creation 4",
        image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        website_url: "https://www.google.com/"
    },
    {
        title: "Creation 5",
        image_url: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        website_url: "https://www.google.com/"
    }
];

var comment_data = [
    {
        author: "My Guy",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        author: "My Dude",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        author: "Person",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
];

function seedDB(){
   //Remove all campgrounds
   Creation.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed creations!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            creation_data.forEach(function(seed){
                Creation.create(seed, function(err, creation){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a creation");
                        //create a comment
                        comment_data.forEach(function(comment) {
                            Comment.create(comment, function(err, addedComment){
                                if(err){
                                    console.log(err);
                                } else {
                                    creation.comments.push(addedComment);
                                    creation.save();
                                    console.log("created new comment");
                                }
                            });
                        });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;