const express = require("express");
const bodyParser = require("body-parser");
const twilio = require('twilio');
const app = express();
const _ = require("lodash");
var path = require ('path');

//const client = twilio('<Your_Twilio_SID>', '<Your_Twilio_Auth_Token>');
app.use(express.static(path.join(__dirname + '../public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Define your pizza menu (pizzas, ingredients, etc.)


  // Define routes


  
app.get('/en', (req, res) => {
  res.render('index_en');
});

app.get('/', (req, res) => {
  res.render('index_tr');
});


// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port  :' + process.env.PORT);
  });