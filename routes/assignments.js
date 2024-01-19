const express = require('express');
const router = express.Router();

const assignments = require('../data/assignments');

// Assignments route
router.get('/', (req, res) => {{
    res.json(assignments);
}});

// Adding route parameter for retrieving a specific assignment by ID
router.get('/:id', (req, res) => {
    const assignmentId = parseInt(req.params.id);
    const assignment = assignments.find(a => a.id == assignmentId);

    if (!assignment) {
        return res.status(404).send('Assignment not found');
    }

    res.json(assignment);
});





module.exports = router;