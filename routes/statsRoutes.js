// routes/taskRoutes.js (Addition)

router.get('/dashboard-stats', async (req, res) => {
    try {
        // 1. Get the count of completed tasks
        const completedRes = await db.query(
            'SELECT COUNT(*) FROM tasks WHERE status = $1', 
            ['completed']
        );

        // 2. Get the total count of all tasks
        const totalRes = await db.query('SELECT COUNT(*) FROM tasks');

        const completedCount = parseInt(completedRes.rows[0].count);
        const totalCount = parseInt(totalRes.rows[0].count);

        // 3. Calculate Performance Percentage
        // Formula: (Completed / Total) * 100
        const performanceRate = totalCount > 0 
            ? Math.round((completedCount / totalCount) * 100) 
            : 0;

        // Send this to the frontend
        res.json({
            completed: completedCount,
            total: totalCount,
            performance: performanceRate,
            label: "Tasks Productivity"
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});