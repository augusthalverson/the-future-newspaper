var express     = require("express"),
    passport    = require("passport"),
    router      = express.Router();

var User        = require("../models/user");

router.get("/user/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
        if (err) {
            console.log(err);
        } else {
            res.render("users/account", {user: foundUser});
        }
    });
});


// =======================
//          AUTH
// =======================

// LOGIN
router.get("/login", function(req, res) {
    res.render("users/login", {pageTitle: "Login"});
});

// LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {

});

// SIGN UP
router.get("/signup", function(req, res) {
    res.render("users/signup", {pageTitle: "Sign Up"});
});

// SIGN UP LOGIC
router.post("/signup", function(req, res){
    console.log(req.body);
    User.register(new User({username:req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}), req.body.password, function(err, user){
        if (err) {
            req.flash("error", err.message);
            res.redirect("users/signup");
        } else {
            passport.authenticate("local")(req, res, function() {
            req.flash("success", "Hello, " + req.user.firstName);
            res.redirect("/articles");
        });
        }
    });
});

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "You are now logged out!");
    res.redirect("/");
})

module.exports = router;