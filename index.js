const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
let items = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' },
];

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    endpoints: {
      root: 'GET /',
      test: 'GET /api/test',
      items: {
        list: 'GET /api/items',
        single: 'GET /api/items/:id',
        create: 'POST /api/items'
      }
    }
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Add new item
app.post('/api/items', (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }
  
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/`);
}); 