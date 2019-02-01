const mongoose = require("mongoose");


const articleSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    author: 
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
            },
        name: String,
    },
    image: String,
    body: String,
    tags: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            },
            keyword: String
        }
    ],
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Article", articleSchema);

