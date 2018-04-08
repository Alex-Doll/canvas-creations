var mongoose = require("mongoose");

var creationSchema = new mongoose.Schema({
    title: String,
    image_url: String,
    website_url: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Creation = mongoose.model("Creation", creationSchema);

module.exports = Creation;