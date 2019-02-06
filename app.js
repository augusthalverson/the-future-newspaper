var express         = require("express"),
    app             = express(),
    favicon         = require("express-favicon"),
    flash           = require("connect-flash"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    methodOverride  = require("method-override"),
    expressSanitizer= require("express-sanitizer"),
    LocalStrategy   = require("passport-local");

var User            = require("./models/user"),
    Article         = require("./models/article")
    
var indexRoutes     = require("./routes/indexRoutes"),
    userRoutes      = require("./routes/userRoutes"),
    articleRoutes   = require("./routes/articleRoutes");

var seedDB          = require("./seeds");

// Connect to DB
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser:true});
// DotEnv
require('dotenv').config()
// Configure favicon
app.use(favicon(__dirname + "/public/favicon.png"));
// Use body-parser
app.use(bodyParser.urlencoded({extended:true}));
// Use express-sanitizer
app.use(expressSanitizer()); // this line follows bodyParser() instantiations
// Use Method Override
app.use(methodOverride("_method"));
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Aaaaaaachhhooooooo sneeze, I love adrian, and I spent the night with him",
    resave: false, 
    saveUninitialized: false
}));
// Use Passport
app.use(passport.initialize());
app.use(passport.session());
// Setup Flash
app.use(flash());

//send with every req
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use(express.static(__dirname + "/public"));  // serve static files (images, css, js)
app.set("view engine", "ejs");


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();

// ROUTE PREFIXES
app.use("/articles", articleRoutes);
app.use("/", indexRoutes);
app.use("/", userRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("thefuture server has started");
});