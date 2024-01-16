const express = require('express');
const router = express.Router();
const animals = require('../data/animals');
// Animals route
router.get('/', (req, res) => {{
    res.json(animals);
}});

// Adding route parameter for retrieving a specific animal by ID
router.get('/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const animal = animals.find(a => a.id === animalId);

    if (!animal) {
        return res.status(404).send('Animal not found');
    }

    res.json(animal);
});

// Updating the 'animals' route to allow filtering through query parameters
router.get('/', (req, res) => {
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



module.exports = router;