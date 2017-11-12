var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    Campground          = require("./models/campground"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    User                = require("./models/user"),
    seedDb              = require("./seed")

// REQUIRING ROUTES    
var campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/auth")

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rojerman is the best dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDb();
mongoose.connect("mongodb://localhost/camp_finder", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
// Static directory // Helps with relative paths
app.use(express.static("public"));
// Must go after bodyparser
app.use(expressSanitizer());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Use Route Files
app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);


app.get("/", function(req, res){
    res.render("landing");
});


app.listen(3000, function(){
    console.log("Camp Finder server has started");
});