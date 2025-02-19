const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
à     
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:


app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi)
    res.render('beers', {beers : beersFromApi})}) 
  .catch((error) => 
    console.error(error)
  ) 
});

app.get('/random-beer', (req, res)=>{
  punkAPI.getRandom()
  .then(beer => {
    res.render("random", beer[0].name)
})
.catch((error) => console.error(error));


app.listen(3000, () => console.log('🏃‍ on port 3000'));
