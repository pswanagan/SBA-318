const express = require('express');
const animals = require('./data/animals');

const animalRoutes = require('./routes/animals');
const keeperRoutes = require('./routes/keepers');
const assignmentRoutes = require('./routes/assignments');

const app = express();

const port = 3000; // Choose a port

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the template engine to EJS
app.set('view engine', 'ejs');

// Route to render a view with a list of all animals using EJS
app.get('/animals', (req, res) => {
    res.render('animals', { animals });
});

app.use('/api/animals', animalRoutes);
app.use('/api/keepers', keeperRoutes);
app.use('/api/assignments', assignmentRoutes);
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








// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});