var express         = require("express"),
    app             = express(),
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


// Connect to DB
mongoose.connect("mongodb://localhost/thefuture", {useNewUrlParser: true});
// DotEnv
const dotenv = require('dotenv');
dotenv.config();
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

//send with every user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(express.static(__dirname + "/public"));  // serve static files (images, css, js)
app.set("view engine", "ejs");


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTE PREFIXES
app.use("/articles", articleRoutes);
app.use("/", indexRoutes);
app.use("/", userRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("thefuture server has started");
});