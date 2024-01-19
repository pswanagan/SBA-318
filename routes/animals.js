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
    const newAnimal = req.body; // Get new animal data from request body
    animals.push(newAnimal);
    res.status(201).send('New animal added');
});

router.patch('/animals/:id', (req, res) => {
    const { id } = req.params;
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

router.delete('/animals/:id', (req, res) => {
   
   
    const animalId = parseInt(req.params.id);

    // Find the index of the keeper with the given ID
    const animalIndex = keepers.findIndex(a => a.id === animalId);
    if (animalIndex === -1) {
        return res.status(404).send('Animal not found');
    }

    // Remove the keeper from the array
    animals.splice(keeperIndex, 1);
    res.send('Animal deleted');
});

module.exports = router;