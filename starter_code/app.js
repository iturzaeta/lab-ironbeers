
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');



app.get('/', (req, res, next) => {
  
  let data = {
    img: "/images/beer.png"
  };

  res.render('index', data);
});



app.get('/beers', (req, res, next) => {
  
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {beers})
  })
  .catch(err => {

    console.log("ERROR", err)
  })

  
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeers => {
    res.render("randomBeer", {randomBeers})
  })
  .catch(error => {
    console.log(error)
  })

});


app.listen(3000);
