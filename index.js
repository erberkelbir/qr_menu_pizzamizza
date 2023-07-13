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
const pizzas = [
    {
      id: 1,
      name: 'Pizza Margherita',
      image: 'link_to_pizza_image',
      ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Fresh Basil'],
      price: 9.99
    },
    {
      id: 2,
      name: 'Pizza Pugliese',
      image: 'link_to_pizza_image',
      ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Olives', 'Onions', 'Olive Oil'],
      price: 11.99
    },
    // ... Define other pizzas here
  ];
  

  const drinks = [
    {
      name: "Drink 1",
      price: 2.99,
      image: "path-to-drink1-image.jpg"
    },
    {
      name: "Drink 2",
      price: 1.99,
      image: "path-to-drink2-image.jpg"
    },
    // Add more drink objects as needed
  ];
  // Define routes
  app.get('/', (req, res) => {
    res.render('index', { pizzas: pizzas,drinks:drinks });
  });
  
  app.post('/order', (req, res) => {
    const selectedPizzas = req.body.pizzas;
    const message = req.body.message;
    const phoneNumber = '+905383213410'; // Replace with your WhatsApp number
  
    const pizzaDetails = selectedPizzas.map((pizzaId) => {
      const pizza = menu.find((item) => item.id.toString() === pizzaId);
      return `Name: ${pizza.name}\nIngredients: ${pizza.ingredients.join(', ')}\n`;
    });
  
    const finalMessage = `Order Details:\n${pizzaDetails.join('\n')}\n\nAdditional Message: ${message}`;
  
    client.messages.create({
      body: finalMessage,
      from: 'whatsapp:<Your_Twilio_Registered_Number>',
      to: `whatsapp:${phoneNumber}`
    }).then(() => {
      res.send('Order placed successfully!'); // Placeholder response, customize as per your needs
    }).catch((err) => {
      res.status(500).send('Failed to send order. Please try again.'); // Handle error if message fails to send
    });
  });








// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });