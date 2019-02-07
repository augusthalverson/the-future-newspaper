var express     = require("express"),
    router      = express.Router(),
    Article     = require("../models/article");

// =======================
//          HOME
// =======================

router.get("/", function(req, res){
    Article.find({}, function(err, foundArticles){
        res.render("homeLayouts/homepage-standard", {articles: foundArticles, pageTitle: "Home"});
    })
    
});



module.exports = router;