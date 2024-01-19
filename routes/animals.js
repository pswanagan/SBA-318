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

router.post('/', (req, res) => {
    const newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        sci_Name: req.body.sci_Name,
        country: req.body.country
    }
    
    console.log(newAnimal);
    animals.push(newAnimal);
    res.status(201).send('New animal added');
});

router.patch('/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const updatedData = req.body; // Get updated data from request body
    // Find the keeper with the given ID
    let animalIndex = animals.findIndex(a => a.id === animalId);
    if (animalIndex === -1) {
        return res.status(404).send('Animal not found');
    }

    // Update the keeper's information
    animals[animalIndex] = { ...animals[animalIndex], ...updatedData};
    res.json(animals[animalIndex]);
    res.send('Animal updated');
});

router.delete('/:id', (req, res) => {
    const animalId = parseInt(req.params.id); // Parse the ID from the URL
    console.log(`Looking for animal with ID: ${animalId}`);

    const animalIndex = animals.findIndex(a => {
        console.log(`Checking animal with ID: ${a.id}`);
        return a.id === animalId;
    }); // Find the animal

    if (animalIndex !== -1) {
        animals.splice(animalIndex, 1); // Remove the animal
        res.send('Animal deleted');
    } else {
        res.status(404).send('Animal not found'); // Animal not found
    }
});

module.exports = router;