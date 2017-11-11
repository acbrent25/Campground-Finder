var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    Campground = require("./models/campground"),
    
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDb = require("./seed")

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

seedDb();
mongoose.connect("mongodb://localhost/camp_finder", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
// Must go after bodyparser
app.use(expressSanitizer());


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE - Show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campagrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })  
});

//CREATE ROUTE - Add new campground to DB
app.post("/campgrounds", function(req, res){
    
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    // create object to push new campgrounds into
    var newCampground = {name: name, image: image, description: desc};
    // create new campground and save to DB

    //Sanitize it
    req.body.description = req.sanitize(req.body.description);
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW ROUTE - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

// SHOW ROUTE - Shows more info about 1 campground
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id
    // render show template with that campground
    
});

// EDIT ROUTE
app.get("/campgrounds/:id/edit", function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.render("edit", {campground: foundCampground});
        }
    });
    
});

// UPDATE ROUTE
app.put("/campgrounds/:id", function(req,res){
    // Sanitize
    req.body.campground.description = req.sanitize(req.body.campground.description);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/campgrounds/:id", function(req,res){
    // destroy campground
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
    //redirect 
});


// AUTH ROUTES 

// SHOW REGISTER FORM
app.get("/register", function(req, res){
    res.render("register");
});

// SIGNUP LOGIC
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM
app.get("/login", function(req, res){
    res.render("login");
});

// LOGIN LOGIC
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login" 
    }), function(req, res){
    
});

// LOGOUT ROUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})



app.listen(3000, function(){
    console.log("Camp Finder server has started");
});