const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    keyword: String,
    articles: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            },
            name: String
        }
    ]
});

module.exports = mongoose.model("Tag", tagSchema);