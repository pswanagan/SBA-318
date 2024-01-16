const express = require('express');
const animals = require('./data/animals');
const keepers = require('./data/keepers');
const assignments = require('./data/assignments');


const app = express();
const bodyParser = require('body-parser');
const port = 3000; // Choose a port

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set the template engine to EJS
app.set('view engine', 'ejs');

// Route to render a view with a list of all animals using EJS
app.get('/animals', (req, res) => {
    res.render('animals', { animals });
});


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

// Keepers route
app.get('/api/keepers', (req, res) => {{
    res.json(keepers);
}});

// Adding a POST route for 'keepers' to allow adding new keeper entries
app.post('/api/keepers', (req, res) => {
    const newKeeper = req.body;
    //Adding the new keeper to the array.
    keepers.push(newKeeper);
    res.status(201).json(newKeeper);
});

// Adding a PATCH route for 'keepers' to allow updating existing keeper entries
app.patch('/api/keepers/:id', (req, res) => {
    const keeperId = parseInt(req.params.id);
    const keeperUpdate = req.body;

    // Find the keeper with the given ID
    let keeperIndex = keepers.findIndex(k => k.id === keeperId);
    if (keeperIndex === -1) {
        return res.status(404).send('Keeper not found');
    }

    // Update the keeper's information
    keepers[keeperIndex] = { ...keepers[keeperIndex], ...keeperUpdate };
    res.json(keepers[keeperIndex]);
});

// Adding a DELETE route for 'keepers' to allow deletion of existing keeper entries
app.delete('/api/keepers/:id', (req, res) => {
    const keeperId = parseInt(req.params.id);

    // Find the index of the keeper with the given ID
    const keeperIndex = keepers.findIndex(k => k.id === keeperId);
    if (keeperIndex === -1) {
        return res.status(404).send('Keeper not found');
    }

    // Remove the keeper from the array
    keepers.splice(keeperIndex, 1);
    res.status(204).send();  // 204 No Content
});

// Animals route
app.get('/api/animals', (req, res) => {{
    res.json(animals);
}});

// Adding route parameter for retrieving a specific animal by ID
app.get('/api/animals/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const animal = animals.find(a => a.id === animalId);

    if (!animal) {
        return res.status(404).send('Animal not found');
    }

    res.json(animal);
});

// Updating the 'animals' route to allow filtering through query parameters
app.get('/api/animals', (req, res) => {
    let filteredAnimals = [...animals];

    // Filter by country if provided
    if (req.query.country) {
        filteredAnimals = filteredAnimals.filter(animal => animal.country === req.query.country);
    }

    // Filter by name if provided
    if (req.query.name) {
        filteredAnimals = filteredAnimals.filter(animal => animal.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }

    res.json(filteredAnimals);
});

// Assignments route
app.get('/api/assignments', (req, res) => {{
    res.json(assignments);
}});

// Adding route parameter for retrieving a specific assignment by ID
app.get('/api/assignments/:id', (req, res) => {
    const assignmentId = parseInt(req.params.id);
    const assignment = assignments.find(a => a.id === assignmentId);

    if (!assignment) {
        return res.status(404).send('Assignment not found');
    }

    res.json(assignment);
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