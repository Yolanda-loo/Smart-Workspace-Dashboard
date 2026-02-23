const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your React app (likely on port 3000) to access this API
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api', taskRoutes);

// Health Check (Good for 2026 deployments like Docker/Vercel)
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(PORT, () => {
  console.log(`🚀 Smart Workspace Server running on port ${PORT}`);
});