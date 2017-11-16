var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    Campground          = require("./models/campground"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    User                = require("./models/user"),
    seedDb              = require("./seed"),
    flash               = require("connect-flash")
    port = process.env.PORT || 3000;

// REQUIRING ROUTES    
var campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/auth")



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rogerman is the best dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDb();
// mongoose.connect("mongodb://localhost/camp_finder", {useMongoClient: true});
mongoose.connect("mongodb://adam:1234@ds259175.mlab.com:59175/campfinder");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// Must go after bodyparser
app.use(expressSanitizer());

// Send current user to every template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Use Route Files
app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);


app.get("/", function(req, res){
    res.render("landing");
});

// Static directory // Helps with relative paths
app.use(express.static("public"));


app.listen(port, function(){
    console.log("Camp Finder server has started");
});