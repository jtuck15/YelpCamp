var express = require('express');
app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [{
    name: "Salmon Creek",
    image: "https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg"
}, {
    name: "Granite Hill",
    image: "https://dnr.wi.gov/images/news/2018/20180918_familycampgroundparks.jpg"
}, {
    name: "Mountain Goat's Rest",
    image: "http://www.ontarioparks.com/parksblog/wp-content/uploads/2013/03/Algonquin_Campsite-825x510.jpg"
}]

app.get('/', function (req, res) {
    res.render('landing')
})

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function (req, res) {
    res.render('new')
})

app.post('/campgrounds', function (req, res) {
    // get data from form and add campgrounds Array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect back to campgrounds page 
    res.redirect('/campgrounds');   
})

app.listen(3000, function () {
    console.log('serving app.js on port 3000');
});