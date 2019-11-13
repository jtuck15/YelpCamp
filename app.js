var express = require('express'),
    app = express(),
    request = require('request'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://dnr.wi.gov/images/news/2018/20180918_familycampgroundparks.jpg"
// }, function (err, campground) {
//     if (err) {
//         console.log()
//     } else {
//         console.log('newly created campground');
//         console.log(campground);
//     }
// });

// ORDER OF THE ROUTES MATTER
app.get('/', function (req, res) {
    res.render('landing')
})

// INDEX - show all campgrounds
app.get('/campgrounds', function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {
                campgrounds: allCampgrounds
            });
        }
    });
});

// CREATE - add new campground to DB
app.get('/campgrounds/new', function (req, res) {
    res.render('new')
})

// NEW - show form to create new campground
app.post('/campgrounds', function (req, res) {
    // get data from form and add campgrounds Array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    }
    // create a new campground and save it to the DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page 
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/:id', function(req, res) {
    // find the campground with the provided id
    // render show template with that campground
    res.send("this will be the show page soon");
});

app.listen(3000, function () {
    console.log('YelpCamp server has started and is running on port 3000');
});