const express = require('express');
const router = express.Router();
const StudyItem = require('../models/StudyItem');

// GET all study items
router.get('/', async (req, res) => {
    try {
        const items = await StudyItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new study item
router.post('/', async (req, res) => {
    const newItem = new StudyItem({
        title: req.body.title,
        subject: req.body.subject,
        notes: req.body.notes
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// PUT - Update an existing study item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await StudyItem.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                subject: req.body.subject,
                notes: req.body.notes
            },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: 'Study item not found'
            });
        }

        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});
// DELETE a study item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await StudyItem.findByIdAndDelete(
            req.params.id
        );

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Study item not found'
            });
        }

        res.json({
            message: 'Study item deleted successfully',
            deletedItem
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});
module.exports = router;
