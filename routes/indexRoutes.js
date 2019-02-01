var express     = require("express"),
    router      = express.Router();

// =======================
//          HOME
// =======================

router.get("/", function(req, res){
    res.redirect("/articles");
});



module.exports = router;