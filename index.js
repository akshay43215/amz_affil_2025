
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS for all routes

// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
    origin: 'http://localhost:5500', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};



//get all-pruducts
app.get('/api/products', (req, res) => {
  console.log('Received request for /api/products');
  
  const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
  res.json(data);
});

//add or edit product
app.post('/api/products', (req, res) => {
  console.log('Received POST request for /api/products with body:', req.body);
  
  const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
  const newProduct = req.body;

  const index = data.findIndex(p => p.id === newProduct.id);

  if (index>-1) {
    data[index] = newProduct; //edit
  }else{
    data.push(newProduct); //add
  }

  fs.writeFileSync('products.json', JSON.stringify(data, null, 2));
  res.json({ success: true, products:data});
});

app.listen(3000, ()=>{ console.log('Server running on http://localhost:3000') })

