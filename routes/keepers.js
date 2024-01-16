const express = require('express');
const router = express.Router();

const keepers = require('../data/keepers');
// Keepers route
router.get('/', (req, res) => {{
    res.json(keepers);
}});

// Adding a POST route for 'keepers' to allow adding new keeper entries
router.post('/', (req, res) => {
    const newKeeper = req.body;
    //Adding the new keeper to the array.
    keepers.push(newKeeper);
    res.status(201).json(newKeeper);
});

// Adding a PATCH route for 'keepers' to allow updating existing keeper entries
router.patch('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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





module.exports = router;