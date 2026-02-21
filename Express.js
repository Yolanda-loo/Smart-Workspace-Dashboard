// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming your DB connection logic is here

// GET all tasks (with optional priority filtering)
router.get('/tasks', async (req, res) => {
    try {
        const { priority } = req.query;
        let queryText = 'SELECT * FROM tasks';
        let queryParams = [];

        // If a priority filter is provided, modify the SQL query
        if (priority && priority !== 'all') {
            queryText += ' WHERE priority = $1';
            queryParams.push(priority);
        }

        // Sort by priority weight (High > Medium > Low)
        queryText += ` ORDER BY 
            CASE priority 
                WHEN 'high' THEN 1 
                WHEN 'medium' THEN 2 
                WHEN 'low' THEN 3 
            END ASC`;

        const result = await pool.query(queryText, queryParams);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
