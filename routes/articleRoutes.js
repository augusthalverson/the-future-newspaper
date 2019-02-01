var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var bodyParser = require("body-parser");

// Use express-sanitizer

// INDEX
router.get("/", function(req, res){
    Article.find({}, function(err, allArticles){
        if (err) {
            console.log(err);
        } else {
            res.render("articles/index", {articles: allArticles});
        }
    });
});

// NEW
router.get("/new", isLoggedIn, function(req, res) {
    res.render("articles/new");
});

// CREATE
router.post("/", isLoggedIn, function(req, res){
    var articleSubmission = req.body.article;
    
    var articleAuthor = {
        id: req.user._id,
        name: req.user.firstName + ' ' + req.user.lastName
    };
    
    var newArticle = new Article({title: articleSubmission.title, subtitle: articleSubmission.subtitle, author: articleAuthor, image: articleSubmission.image, body: articleSubmission.body})
    
    Article.create(newArticle, function(err, articleCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/articles/" + articleCreated._id)
        }
    });
});

// SHOW
router.get("/:id", function(req, res) {
    Article.findById(req.params.id, function(err, articleFound){
        var dateCreated = formatDate(articleFound.created);
        if (err) {
            console.log(err);
        } else {
            res.render("articles/show", {article: articleFound, date: dateCreated});
        }
    })
});

// EDIT
router.get("/:id/edit", function(req, res) {
    Article.findById(req.params.id, function(err, articleFound){
        if (err) {
            console.log(err);
        } else {
            res.render("articles/edit", {article: articleFound});
        }
    })
});

// UPDATE
router.put("/:id", function(req, res){
    req.body.article.body = req.sanitize(req.body.article.body);
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, articleUpdated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/articles/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:id", function(req, res) {
    Article.findByIdAndDelete(req.params.id, function(err, articleCreated){
        if (err){
            console.log(err);
        } else {
            console.log("article deleted");
            res.redirect("/articles");
        }
    })
});

//Middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


function formatDate(date) {
    var dayNames = [
         "Sunday", "Monday", "Tuesday", "Wednesday",
         "Thursday", "Friday", "Saturday"
    ];
    var dateNames = [
        "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "10th",
        "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th",
        "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th",
        "29th", "30th", "31st"
    ];
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var currentDay = dayNames[date.getDay()];
    var currentDate = dateNames[date.getDate()];
    var currentMonth = monthNames[date.getMonth()];
    var currentYear = date.getFullYear();

    return currentDay + ', ' + currentMonth + ' ' + currentDate + ', ' + currentYear;
}

module.exports = router;