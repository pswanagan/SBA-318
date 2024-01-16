const express = require('express');
const app = express();
const port = 3000; // Choose a port

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the template engine to EJS
app.set('view engine', 'ejs');

// Serve static files from a "public" directory
app.use(express.static('public'));

// Define your API routes
app.get('/api/data', (req, res) => {
  // Your RESTful API logic here
});

// Define a route for rendering views
app.get('/views', (req, res) => {
  res.render('index', { message: 'Hello from Express!' });
});

// Custom middleware function
const customMiddleware = (req, res, next) => {
    // Your middleware logic here
    console.log('Custom Middleware executed');
    next();
  };
  
  // Use the custom middleware in your application
  app.use(customMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

