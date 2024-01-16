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

// Custom Middleware #1: Logging Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
};

app.use(loggerMiddleware);

// Custom Middleware #2: Authentication Middleware (Placeholder)
const authMiddleware = (req, res, next) => {
    // Placeholder for authentication logic
    // If authenticated, call next(), else respond with an error
    next();
};

app.use(authMiddleware);

// Define routes for different data categories: Users, Posts, Comments

// Users route
app.get('/api/users', (req, res) => {
    // Logic to handle user data
    res.send('Users data');
});

// Posts route
app.get('/api/posts', (req, res) => {
    // Logic to handle post data
    res.send('Posts data');
});

// Comments route
app.get('/api/comments', (req, res) => {
    // Logic to handle comments data
    res.send('Comments data');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});