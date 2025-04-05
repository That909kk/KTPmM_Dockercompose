const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Define a simple Item schema
const ItemSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Node.js MongoDB API - Running!');
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name
    });
    
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});